# Finish the Theme choice module

**Status:** Open (queued, priority 3) · **Strength:** Worth exploring · **Dependency category:** in-process
**Source:** architecture review 2026-09-05

## Friction

`lib/theme.ts` is already a decent deep module for Theme choice *state* — it owns the type, `nextChoice`, `resolveAppliedTheme`, read/apply/subscribe, and the pre-paint boot script, and `tests/theme.test.ts` covers resolution + cycling. But the *choice set itself* is re-declared at the UI leaf, so state logic and UI enumeration can drift.

**Evidence:**

- `app/components/navigation_bar.tsx:28-43` — re-declares what the state module should own:
  ```ts
  const THEME_CHOICE_LABEL: Record<ThemeChoice, string> = { system: 'System', light: 'Light', dark: 'Dark' };
  const THEME_CHOICE_ICON: Record<ThemeChoice, LucideIcon> = { system: SunMoon, light: Sun, dark: Moon };
  const THEME_CHOICES = ['system', 'light', 'dark'] as const;
  ```
  `THEME_CHOICES` duplicates the union in `lib/theme.ts` by hand; `nextChoice`'s cycle order and this array's order must stay in sync with no mechanism enforcing it.
- The mobile menubar (same file) maps the choice set again for menu items.
- `app/globals.css` — `[data-theme]` tokens are the styling face of the choice set (legitimately separate).
- `app/layout.tsx` consumes `THEME_BOOT_SCRIPT` (already exported by `lib/theme.ts` — good).

**Locality measurement:** adding a 4th Theme choice today = edits in `lib/theme.ts` (type, `nextChoice`, `readThemeChoice` validation) + `navigation_bar.tsx` (array, labels, icons, menubar) + `app/globals.css` (tokens) — 3 files, and nothing tests that the cycle, the labels and the array agree. After deepening: 2 files (theme.ts + globals.css tokens, the latter being styling, not logic).

## Shape of the deepening (not yet designed — no interface decided)

`lib/theme.ts` also exports the ordered choice set and its labels; the menubar keeps only icon presentation (icons are React components — whether they move into the module is a design question, since lib/ is UI-free today).

## Related

- Existing spec: `../specs/theme-choice.md` (the feature spec this module implements) — user story 20 already asks for "one tested pure core".
- CONTEXT.md terms: **Theme**, **Theme choice**. No new terms expected unless grilling names one.

## Frontier to grill (draft — first round)

1. Do labels move into `lib/theme.ts` (and the aria-label string pattern with them), or stay in the menubar? *(recommend labels + ordered set move; aria phrasing stays UI)*
2. Do icons move? They are `LucideIcon` React references — moving them makes lib/theme.ts UI-coupled. *(recommend icons stay in the menubar, keyed off the exported choice set)*
3. Should the menubars be derived from the exported set (so a 4th choice shows up in both desktop cycle and mobile menu automatically), and is that wanted for the desktop *cycle* button at all?
4. Is this worth doing standalone, or folded into whichever candidate touches `navigation_bar.tsx` next? *(recommend standalone — it is small and independently testable)*

## Settled

(nothing yet)

## Log

- 2026-09-05 — queued from architecture review.
