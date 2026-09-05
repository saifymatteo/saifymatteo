## Problem Statement

The site renders light unless the visitor has manually toggled before. It never consults the visitor's device preference, so a dark-mode visitor is greeted by a blinding white page on every new browser or device and must go find the toggle. The toggle's icon also advertises the wrong intent: it shows the theme you'll switch _to_, which the owner only noticed once a third state entered the picture.

## Solution

The Theme follows the visitor's device preference by default (**System** in the glossary sense of **Theme choice**), re-applying instantly if the device preference changes while browsing. A manual **Light** or **Dark** pick overrides the device until the visitor picks **System** again, which forgets the override. The desktop icon button cycles through the three states and shows the _current_ one; the mobile menu offers the three states explicitly with the active one checked.

## User Stories

1. As a visitor whose device is in dark mode, I want the site to open dark on my first visit, so that I am not blinded and don't have to search for a toggle.
2. As a visitor whose device is in light mode, I want the site to open light, so that it feels native to my device.
3. As a visitor, I want the theme applied before the first paint, so that I never see a flash of the wrong theme.
4. As a desktop visitor, I want the theme button to show which state is currently active (sun-and-moon for System, sun for Light, moon for Dark), so that I know what the site is doing before I click.
5. As a desktop visitor, I want one click to advance to the next state (System → Light → Dark → System), so that I can reach any state in at most two clicks.
6. As a desktop visitor on System, I want the icon to be the sun-and-moon mark, so that I can tell "following my device" apart from an explicit choice.
7. As a desktop visitor, I want the icon swap to stay animated like today, so that the control feels alive and consistent with the rest of the site.
8. As a mobile visitor, I want a Theme menu listing System, Light and Dark, so that I can jump straight to the state I want.
9. As a mobile visitor, I want the active state marked in the menu, so that I know which one is in effect.
10. As a visitor who picked Light or Dark, I want that choice remembered on every future visit, so that I don't have to repeat myself.
11. As a visitor who picks System again, I want the site to forget my override and follow my device, so that my device preference is respected once more.
12. As a visitor on System, I want a device theme change (e.g. scheduled night mode) to apply instantly, so that the site stays in step without a reload.
13. As a visitor with an explicit Light or Dark choice, I want device theme changes to leave the site alone, so that my choice wins.
14. As a returning visitor, I want my stored choice applied before first paint, so that there is no flicker on load.
15. As a visitor navigating between pages, I want the theme and button icon to stay consistent, so that nothing resets mid-visit.
16. As a keyboard user, I want the theme controls focusable and labelled, so that I can operate them without a pointer.
17. As a screen-reader user, I want the toggle's accessible label to reflect the current state, so that I know what activating it will do.
18. As a visitor in private browsing where storage is blocked, I want the site to keep working and follow my device, so that the feature degrades gracefully.
19. As the owner, I want no new third-party dependency for theming, so that the dependency surface and supply chain stay minimal.
20. As the owner, I want the theme rules captured in one tested pure core, so that resolution and cycle regressions are caught without a browser.
21. As a maintainer, I want the palette to remain driven by a single attribute on the document root, so that all existing CSS keeps working unchanged.
22. As a visitor, I want browser chrome (scrollbars, native form controls) to match the applied theme, so that the page reads as one coherent surface.

## Implementation Decisions

- **Model**: three-state **Theme choice** — System, Light, Dark (glossary term already recorded). System is represented by the _absence_ of the stored value; picking System deletes the stored key rather than writing a sentinel. Light/Dark overwrite the key.
- **Palette contract unchanged**: the applied theme is expressed solely as a light/dark attribute on the document root; server render defaults to light; the CSS dark variant and `color-scheme` blocks are untouched.
- **Pure core** (the single test seam, shape settled during design):
  - `type Choice = 'system' | 'light' | 'dark'`
  - `resolveAppliedTheme(stored: 'light' | 'dark' | undefined, prefersDark: boolean): 'light' | 'dark'`
  - `nextChoice(choice: Choice): Choice` — cycle System → Light → Dark → System, derived from the ordered `THEME_CHOICES` set (the set is the cycle order).
- **Desktop button**: cycles on click; icon mirrors the _current_ choice using Lucide's `SunMoon` (System), `Sun` (Light), `Moon` (Dark) — all confirmed present in the installed icon package. Keeps the existing ring + flip animation; drops the legacy whole-button dark-mode 180° rotation, which belonged to the old show-next convention and would render the new icons upside down.
- **Mobile menu**: three explicit items — System / Light / Dark — with a check mark on the active one; selecting System deletes the stored key.
- **Instant device tracking**: the pre-paint boot script attaches a `prefers-color-scheme` change listener that re-applies the resolved theme only while no explicit choice is stored. A plain DOM script in the document head survives client-side navigation, so no React lifecycle is involved.
- **Boot script**: runs before paint; reads the stored value inside try/catch; falls back to the media query. Toggle writes get the same guard (private-mode safe).
- **Icon state**: driven by React state in the navigation bar, because the CSS dark variant cannot distinguish "System, resolved light" from "explicit Light". Server render draws the System icon; a post-mount correction follows — worst case a one-frame icon swap. The palette itself is always correct pre-paint.
- **Module layout**: one shared theme module exports the choice type, the ordered choice set (`THEME_CHOICES`) with its labels (`THEME_CHOICE_LABEL`), the pure core — with `nextChoice` derived from the set's order — plus apply/read/subscribe helpers and the boot-script string; both controls consume it. The menubar keeps only what is inherently UI: the icon mapping (`Record<ThemeChoice, LucideIcon>`, exhaustive-checked by tsc) and presentation copy (the aria sentence). Hand-rolled — `next-themes` explicitly rejected by the owner (deployment issues, stale maintenance). See ADR-0007.
- Conventional commits with the `[nextjs]` scope.

## Testing Decisions

- A good test asserts external behavior of the pure core only: given (stored choice, device preference) → applied theme; given current choice → next choice. No DOM, no React, no implementation details.
- **One seam, tested**: the theme module's pure core. Everything else — boot script, device-change listener, navigation-bar UI — is browser-verified instead (device emulation: OS init, cycle clicks, storage removal on System, instant device flip, no-flash, mobile menu).
- Runner: Node's built-in test runner with TypeScript type stripping — `node --test --experimental-strip-types` — zero new dev dependencies; the owner's established convention in sibling repos.
- Prior art: none inside this project (this becomes its first suite); sibling repos in the owner's workspace already run `node --test` suites.

## Out of Scope

- `next-themes` or any theming dependency.
- Per-page or per-section theme overrides — the Theme stays site-wide.
- Any new desktop surface (dropdown); System stays reachable via the cycle button and the mobile menu.
- Palette transition animations beyond the existing micro-interactions.
- An ADR — nothing hard to reverse, no real trade-off; the glossary amendment covers the vocabulary.
- Server-side/cookie-carried preference: storage-only is accepted; first paint relies on the boot script.

## Further Notes

- Design settled across two grilling rounds; the glossary (**Theme**, **Theme choice**) is already updated in the project context doc.
- Known accepted trade-off: server render always draws the System icon; visitors with a stored explicit choice may see the icon settle one frame after mount. Palette is unaffected.
- The old "show the theme you'll switch to" icon convention is intentionally replaced by "show current state" — required by the 3-state cycle, confirmed by the owner.
