# Finish the Theme choice module

**Status:** Built (2026-09-05) · **Strength:** Worth exploring · **Dependency category:** in-process
**Source:** architecture review 2026-09-05

## Friction

`lib/theme.ts` is already a decent deep module for Theme choice _state_ — it owns the type, `nextChoice`, `resolveAppliedTheme`, read/apply/subscribe, and the pre-paint boot script, and `tests/theme.test.ts` covers resolution + cycling. But the _choice set itself_ is re-declared at the UI leaf, so state logic and UI enumeration can drift.

**Evidence:**

- `app/components/navigation_bar.tsx:28-43` — re-declares what the state module should own:
  ```ts
  const THEME_CHOICE_LABEL: Record<ThemeChoice, string> = {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
  };
  const THEME_CHOICE_ICON: Record<ThemeChoice, LucideIcon> = {
    system: SunMoon,
    light: Sun,
    dark: Moon,
  };
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

1. Do labels move into `lib/theme.ts` (and the aria-label string pattern with them), or stay in the menubar? _(recommend labels + ordered set move; aria phrasing stays UI)_
2. Do icons move? They are `LucideIcon` React references — moving them makes lib/theme.ts UI-coupled. _(recommend icons stay in the menubar, keyed off the exported choice set)_
3. Should the menubars be derived from the exported set (so a 4th choice shows up in both desktop cycle and mobile menu automatically), and is that wanted for the desktop _cycle_ button at all?
4. Is this worth doing standalone, or folded into whichever candidate touches `navigation_bar.tsx` next? _(recommend standalone — it is small and independently testable)_

## Settled

All decisions recorded above + **ADR-0007** (`docs/adr/0007-theme-choice-set-ownership.md`) + Implementation Decisions updated in `docs/specs/theme-choice.md`. Built as:

- `lib/theme.ts` — exports ordered `THEME_CHOICES` (`as const satisfies readonly ThemeChoice[]`) + `THEME_CHOICE_LABEL`; `nextChoice` = index arithmetic over the set (switch gone)
- `navigation_bar.tsx` — imports both; keeps `THEME_CHOICE_ICON` (tsc-exhaustive) + aria composition only
- `tests/theme.test.ts` — +4 coherence tests (set equals union in order, labels complete, cycle walks the array wrapping at both ends, boot script targets the storage key)
- `package.json` — test script → quoted glob `"tests/*.test.ts"` (new test files picked up automatically; dir mode ruled out — default discovery excludes `.ts`)

## Log

- 2026-09-05 — queued from architecture review.
- 2026-09-05 — In design. Fact-check: claims verified against current source (line numbers shifted to 29–43 after this session's toggle fix). Confirmed single UI consumer: `navigation_bar.tsx` is the only file importing the choice set (`layout.tsx` uses only `THEME_BOOT_SCRIPT`). Note: both `THEME_CHOICES` maps (desktop icons line 107, mobile menu line 154) already share the one in-file array — the duplication is between `lib/theme.ts`'s union/`nextChoice` and the menubar's array, plus the aria-label's label dependency.
- 2026-09-05 — Round 1 settled: q1b, q2b, q3a, q4-yes (+ test-runner glob question answered: hardcoded list → quoted glob; dir mode ruled out by .ts exclusion). Frontier empty.
- 2026-09-05 — Built. 46/46 tests (+4 coherence), tsc/eslint/next build PASS, live pass: desktop aria cycle (System→Light→Dark→System with module labels), animation containment maxOvershoot 0 (no regression from the toggle fix), mobile menu lists the module's set, Dark/System apply + store + check-mark correctly. Artifacts: ADR-0007 + theme-choice.md update.
