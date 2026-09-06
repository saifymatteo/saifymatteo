---
version: alpha
name: Mashuri design system
description: >
  A gradient-carried portfolio system with Apple-adapted discipline: one
  accent, one shadow, a four-role radius grammar, and a weight ladder without
  500. Structure adapted from the Apple design analysis (an external
  reference document, not committed to this repository);
  identity — the brand gradient, three typefaces, and the visitor's Theme
  choice — is our own. This file is the single source of truth for visual
  decisions. `design/SPEC.md` is the historical Figma-extraction record.
adapted_from: Apple design analysis (external reference, uncommitted)

colors:
  canvas: '#ffffff / #2e2e2e'
  parchment: '#f5f5f7 / #353535'
  ink: '#1a1a1a / #ffffff'
  ink-muted: '#2e2e2e / #cccccc'
  accent: '#0494df / #8dd9ff'
  on-accent: '#ffffff / #1a1a1a'
  hairline: 'rgba(0,0,0,0.08) / rgba(255,255,255,0.14)'
  destructive: '#dc2626 / #f87171'
  gradient: 'accent-raw #0494df → accent-soft #8dd9ff (surface role)'

typography:
  display: 'Fira Sans 48px / 700 / 1.1 / -0.01em'
  heading: 'Fira Sans 30px / 700 / 1.25'
  title: 'Fira Sans 26px / 700 / 1.3'
  body: 'Fira Sans 17px / 400 / 1.47'
  caption: 'Fira Sans 14px / 400 / 1.43'
  micro: 'Fira Sans 12px / 400 / 1.35'
  label: 'Fira Sans 14px / 300 / uppercase / tracking-widest'
  mono-accent: 'Fira Code 600 — role pill, inline code'
  script-accent: 'Cookie 400 — ''Hola'' hero backdrop, "I''m" intro'

rounded:
  pill: 9999px
  card: 18px
  inner: 14px
  none: 0px

shadow:
  card: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
---

# Mashuri design system

A photography-and-gradient portfolio that borrows Apple's structural
discipline without Apple's palette. The brand gradient (`#0494df → #8dd9ff`)
is a **surface role**: it fills full-bleed Brand Bands (hero, featured
sections, contact card) and the thin Gradient Bar divider — color itself does
the sectioning, as on apple.com. Everything interactive carries a single
**Accent**; elevation comes from exactly one shadow, reserved for content
cards. Light and Dark are both first-class Themes (visitor's choice: System /
Light / Dark), so "dark tile" is a theme-relative token, never a hardcoded
hex.

**Key characteristics:**

- The gradient is the brand's voice — used as a surface and as the one
  divider element, never as scattered chrome.
- One accent, one shadow, one divider. Everything else is flat: hairlines,
  surface changes, and whitespace do the work.
- Weight ladder is 300 / 400 / 600 / 700 — 500 is deliberately absent (Apple
  rule). Body copy reads at 17px.
- Radius is a four-role grammar: pill (actions), card (18px), inner (14px),
  none (full-bleed). Nothing in between.
- Alternation creates rhythm: Brand Band → Canvas → Parchment → Canvas, under
  either Theme.

## Adaptation ledger

What was taken from the Apple reference, what was kept as identity, and what
was rejected — with the why.

**Adopted (structure):**

- **Parchment** as the alternate light surface (#f5f5f7) for tile
  alternation — Apple's subtlest idea, adopted nearly verbatim.
- **Radius grammar** — Apple's "don't mix radii grammars" mapped to four
  roles (pill / card / inner / none).
- **Single-shadow policy** — elevation belongs to content (our cards are the
  gallery's product renders); chrome is flat with hairlines.
- **Weight ladder 300 / 400 / 600 / 700** — 500 deliberately absent.
- **Negative tracking at display sizes** — tuned for Fira Sans to -0.01em
  (Apple's own substitution note for non-SF typefaces).
- **Body at 17px** with 1.47 leading — the "reading, not scanning" pace.
- **Semantic role naming** (Canvas, Parchment, Ink, Accent, Hairline) over
  fg/bg pairs.
- **Do's/Don'ts + iteration discipline** — one component at a time, token
  references, no undocumented states.

**Kept (identity):**

- **The brand gradient** as a surface role and the Gradient Bar as the one
  divider — SPEC.md calls the gradient "the entire color system"; it stays.
- **Three typefaces**: Fira Sans (identity voice), Fira Code (role pill,
  mono accents), Cookie (script accents "Hola" / "I'm"). Apple's system has
  no slot for a script voice; ours does.
- **Theme choice** (System / Light / Dark, ADR-0007) — the visitor decides;
  both themes are fully tokenized. Apple's fixed light-dominant tiles are a
  design decision we cannot import.
- **Card rest + hover shadow** (`shadow-card`) — project cards are our
  product renders; they keep their depth and the card-lift micro-interaction.
- **Dark Canvas #2e2e2e** — our near-black, not Apple's #272729 tile family.
- **Display weight 700** — Apple headlines sit at 600; our identity runs
  bolder (SPEC: H1 w700).

**Rejected:**

- **Apple's gradient ban** — it would erase the brand; instead the gradient
  is formalized as a role with exactly two expressions (surface, divider).
- **SF Pro / system-ui / Inter** — Fira Sans is the identity.
- **Apple's fixed tile alternation as the only theme** — replaced by
  theme-relative tokens under the visitor's Theme choice.
- **Apple's tile hexes** (#272729 family) — we keep our own dark canvas.

## Colors

Two layers, enforced by the token architecture in `app/globals.css`:

1. **Semantic roles** — the only tokens components may use
   (`bg-canvas`, `text-ink`, `text-accent`, `border-hairline`, …).
2. **Raw palette** — `blue` #0494df, `blue-light` #8dd9ff, `grey` #2e2e2e,
   `white` #ffffff. For the shader backdrop internals and gradient stops
   only. Never in new component code.

Every semantic role has a Light and Dark value; the Theme switch swaps the
set, components never branch on theme.

| Role          | Light             | Dark                  | Use                                                           |
| ------------- | ----------------- | --------------------- | ------------------------------------------------------------- |
| `canvas`      | #ffffff           | #2e2e2e               | The page surface; cards and content sit on it                 |
| `parchment`   | #f5f5f7           | #353535               | The alternate tile surface; hover fills for shadcn primitives |
| `ink`         | #1a1a1a           | #ffffff               | Headlines and body on canvas/parchment                        |
| `ink-muted`   | #2e2e2e           | #cccccc               | Status labels, secondary copy                                 |
| `accent`      | #0494df           | #8dd9ff               | The single interactive color: links, pills, tags, focus rings |
| `on-accent`   | #ffffff           | #1a1a1a               | Text/icon on filled accent                                    |
| `hairline`    | rgba(0,0,0,.08)   | rgba(255,255,255,.14) | 1px card borders, quiet separators                            |
| `destructive` | #dc2626           | #f87171               | Form errors only — not a decorative color                     |
| `gradient`    | #0494df → #8dd9ff | identical             | Surface role: Brand Band fill + Gradient Bar                  |

**Rules:**

- The Accent is the only "click me" signal. No second interactive color
  exists. On dark surfaces the dark-theme Accent (#8dd9ff) is already the
  brighter variant — there is no separate "link on dark" token.
- `text-white` is banned and fully migrated (Phase 2): text on the
  theme-invariant Brand Band / shader surfaces is `text-on-dark` (constant
  white — the gradient palette doesn't shift with the Theme choice); text on
  accent fills is `text-on-accent`.
- No decorative gradients beyond the two sanctioned expressions (surface
  fill, divider bar).

## Typography

**Families:** Fira Sans for everything textual; Fira Code for mono accents
(role pill, code snippets); Cookie for the two script accents ("Hola" hero
backdrop, "I'm" intro). The script word is "Hola" — the code renders
H/o/la; SPEC.md's "Hla" is a typo in the historical record.

**Weight ladder:** 300 / 400 / 600 / 700. Weight 500 is deliberately absent
— a `font-medium` in review is a defect. Fully migrated in Phase 2: the
ladder is the only thing that renders (the font config ships exactly these
four Fira Sans weights).

**Roles** (Tailwind `text-*` tokens; base elements map to them — h1 display,
h2 heading, h3–h6 title, p/a body):

| Token              | Size / weight | Line height | Tracking                   | Use                                             |
| ------------------ | ------------- | ----------- | -------------------------- | ----------------------------------------------- |
| `text-display`     | 48 / 700      | 1.1         | -0.01em                    | Hero name, page H1s ("Projects", "Interested?") |
| `text-heading`     | 30 / 700      | 1.25        | 0                          | Section headings                                |
| `text-title`       | 26 / 700      | 1.3         | 0                          | Card titles, sub-section heads                  |
| `text-body`        | 17 / 400      | 1.47        | 0                          | Paragraphs, links, default reading size         |
| `text-caption`     | 14 / 400      | 1.43        | 0                          | Secondary copy, footer headers                  |
| `text-micro`       | 12 / 400      | 1.35        | 0                          | Tech tags, fine print                           |
| `label` (composed) | 14 / 300      | —           | tracking-widest, uppercase | LINKS / ELSEWHERE / status labels               |

**Rules:**

- Negative tracking exists only at `display` size — never on body/caption
  (Apple rule, Fira-tuned).
- The old `h1–h6 { em }` ladder is gone; em compounding with `text-*`
  classes was the type system's original sin. Sizes come from roles.
- Display/heading/title default to 700 (identity); inline strong emphasis
  uses 600.

## Shapes — the radius grammar

| Role                  | Value  | Use                                                    |
| --------------------- | ------ | ------------------------------------------------------ |
| `pill` (rounded-full) | 9999px | Buttons, Pills, tech tags, search — the action signal  |
| `card` (rounded-2xl)  | 18px   | All cards — project cards, contact card, menu surfaces |
| `inner` (rounded-xl)  | 14px   | Imagery/logo panels inside a card                      |
| `none`                | 0      | Full-bleed tiles and bands                             |

- No radius outside these four. Phase 2 migrated the strays: shadcn Button
  `rounded-4xl` → pill, menu surfaces `rounded-3xl` → inner, contact card
  `[20px]` → card. Unused scale stops in `globals.css` are inert.
- Full-bleed surfaces never round; rounding is for floating content.

## Layout & spacing rhythm

Tailwind's 4px-base spacing scale is the unit system; the grammar fixes the
rhythm:

- **Page gutter:** `px-6` (24px); content is centered by the
  `content-max-width` (1040px) / `content-max-width-slim` (880px) utilities.
- **Section rhythm:** `py-20`/`py-24` (80–96px) vertical padding per
  section — the tile's pedestal of air.
- **Card padding:** `p-8` (32px) — deliberately more than Apple's 24px: our
  cards carry meta, tags and CTA. Grammar: cards `p-8`, grids `gap-6`
  (24px).
- **Buttons:** `px-7 py-3` (large CTA), `px-4 py-1.5` (Pill).
- Content max width locks at 1040px (880px for narrow prose); full-bleed
  surfaces ignore it.

## Elevation & depth

| Level       | Treatment              | Use                                                                     |
| ----------- | ---------------------- | ----------------------------------------------------------------------- |
| Flat        | No shadow, no border   | Bands, tiles, footer, page background                                   |
| Hairline    | 1px `hairline` border  | Cards, quiet separators, inputs                                         |
| Card shadow | `shadow-card` token    | Content cards only — rest state; hover keeps it with the translate lift |
| Backdrop    | `backdrop-blur` shader | Inside Brand Bands (ShaderBackdrop), not elevation                      |

- **Exactly one shadow** in the system: `--shadow-card`. It belongs to
  content cards (our product renders), never to chrome. Chrome is flat
  (Phase 2): the nav bar carries a hairline bottom; menu surfaces separate
  with the hairline ring; the contact form ships no shadow. The lightbox
  media uses the same card shadow.
- Elevation otherwise comes from surface change and hairlines — never from
  stacked shadows.

## Components

### Navigation bar

Flat canvas bar, h-16, sticky, hairline bottom border (Phase 2 — the only
separation chrome gets). Brand logo left; links right in `text-lg` 700
(active) / 600 (idle) with `underline-slide` hover. Theme toggle cycles
System → Light → Dark (ADR-0007).

### Pills & buttons

`Pill` — rounded-full chip: `bg-parchment` fill, `text-ink` text,
`font-mono` 600. Parchment-on-gradient and parchment-on-canvas both pass
WCAG AA (~16:1 light / ~12:1 dark) — this replaced the legacy
canvas-fill + accent-text ghost that failed contrast on the band (the
Lighthouse `color-contrast` failure, fixed in Phase 2). Used for role tag,
"Featured Works", contact values. CTAs — rounded-full accent-filled with
`on-accent` text, or `on-dark` outline on the band. Press feedback:
translate (or Apple-style scale) — never a color change.

### Project cards

The system's "product renders" — the only shadowed surface. `rounded-2xl`
card radius, `p-8`, `border-hairline`, `shadow-card`, hover lift
(`-translate-y-1`). Anatomy: meta row (platform pill + date + status label)
→ title (`text-title`) → description (`text-body`, clamped) → tech tags
(`text-micro` pills) → "Case Study" accent link with arrow nudge.

### Brand Band (PageHero)

Full-bleed `gradient-surface` + ShaderBackdrop, `content-max-width` inner.
Carries the hero, the Projects section, contact hero. The color change
between Band and Canvas is a section divider by itself.

### Gradient Bar

10px (default `h-2`) brand-gradient strip — **the one sanctioned divider**.
Bounds the Tech Stack Ticker and tops the Footer. Never used as scattered
decoration.

### Tech Stack Ticker

Marquee between two 5px Gradient Bars; items `text-2xl` 600. Keeps
scrolling under Reduced Motion (deliberate, per CONTEXT.md).

### Contact card

`rounded-2xl` (migrated from stray `[20px]`), gradient surface + shader,
centered stack: "Interested?" (`text-display`, on-dark) → body →
"Get in touch" pill CTA.

### Footer

Canvas surface topped by a Gradient Bar. Brand block + link columns;
headers use the `label` pattern; links `text-body` with `underline-slide`;
legal row `text-caption` ink-muted.

### Case study

Hero info cards (label + value), numbered sections — ordinals derived from
position (ADR-0006), titles `text-heading`, body `text-body`,
`content-max-width-slim` prose column.

## Do's and Don'ts

### Do

- Use `accent` for every interactive element and nothing else.
- Reach for the eight semantic tokens — never raw hex, never `text-white`.
- Alternate surfaces (Band ↔ Canvas ↔ Parchment) before adding chrome.
- Reserve `shadow-card` for content cards; use hairlines everywhere else.
- Keep the four-role radius grammar; pill means "action".
- Set display sizes with tracking-tight roles; kill any `font-medium`.

### Don't

- Don't introduce a second accent or interactive color.
- Don't use the gradient as scattered decoration — it is a surface fill or
  the divider bar, nothing else.
- Don't branch on theme inside components — tokens carry the theme.
- Don't round full-bleed tiles; don't radius outside the grammar.
- Don't shadow chrome (nav, menus, forms) — shadow is content's privilege.
- Don't use weights outside 300 / 400 / 600 / 700.

## Iteration guide

1. One component at a time; reference its section above.
2. Token references only — `{colors.accent}`-style refs in prose, semantic
   classes in code.
3. Document default and pressed/active states only; never hover-only design.
4. Surface alternation beats added chrome when emphasis is unclear.
5. Phase 2 compliance is shipped (ADR-0009's consequences record the
   migration). The perf/a11y follow-up lives in
   `docs/phase-1.5-perf-a11y-plan.md`.

## Known gaps

## Known gaps

- **shadcn `secondary` pair:** the bridge defines `--color-secondary`
  (parchment) but no `--color-secondary-foreground` — every primitive usage
  was migrated to `text-ink` on `bg-parchment` in Phase 2, so nothing
  references the missing pair. If a future shadcn primitive expects it,
  map it to `text-ink` (text on parchment).
- **`--color-primary` is undefined by design:** the shadcn Button variant
  using it was migrated to `bg-accent`/`text-on-accent` in Phase 2 (pill
  radius, 600 weight); the token stays undefined unless a consumer returns.
- Form validation/error visuals: `destructive` token exists; field-level
  error styling undocumented until needed (matches SPEC's gap).
- Cookie script sizes are container-relative (`44cqw` on the hero "Hola",
  `text-5xl` on "I'm") — not tokenized; acceptable while the hero is the
  only consumer. The "Hola" letter fragments are spans: bare `<p>` would
  inherit the `text-body` base role and collapse the script word.
- The resume-dialog panel border is `border-ink` (byte-identical legacy
  strength, not hairline) — polish candidate, not a violation: it is a
  modal edge, not a quiet separator.
