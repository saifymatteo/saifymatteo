# One place for stacking and width rules

**Status:** Built (2026-09-05) · **Strength:** Speculative · **Dependency category:** in-process
**Source:** architecture review 2026-09-05

## Friction

Stacking order and content width are expressed as magic values at the leaves. Twice in one session (2026-09-05), two of these values met across a seam and shipped a real bug.

**Evidence:**

- Bug 1: Resume dialog overlay (`z-50`) painted _below_ the nav because the dialog was trapped inside `page_hero.tsx`'s `relative z-10` stacking context — fixed by portaling to `document.body` (`app/contact/components/resume_dialog.tsx`).
- Bug 2: The nav's `z-49` exists only to sit one step below the dialog's `z-50` — the relationship lives in two different files with no name for it.
- `page_hero.tsx:15` — `content-max-width relative z-10` (load-bearing stacking fix, discussed below).
- `content-max-width` / `content-max-width-slim` appear in **10 places across 8 files** (footer, navigation_bar, page_hero, contact_form, page.tsx, projects/page.tsx, case_study, case_study_preview).
- Vertical rhythm (`py-16`, `py-20`, `pb-24`…) is hand-rolled per section on every page.

## Shape of the deepening (not yet designed — no interface decided)

A single CSS module owns a named z-scale (`--z-backdrop < --z-nav < --z-overlay`) and the width tokens; call sites express intent ("nav", "overlay") instead of numbers. `page_hero.tsx` stays the Hero module — it looks shallow but is **load-bearing**: deleting it would re-scatter the stacking fix that killed Bug 1.

## Frontier to grill (draft — first round)

1. Is a z-scale worth it for a site with exactly three z-users (nav, dialog, hero content)? _(recommend: cheap version — three named CSS variables, no full token system)_
2. Scope: stacking only, or also width + vertical rhythm tokens? _(recommend stacking only; rhythm is working and tokenizing it touches every page)_
3. Does the Home Check dialog need to keep its portal (yes — separate concern; do not couple these).
4. If declined, record an ADR so future reviews stop proposing it? — the review history says the pain is real but small.

## Housekeeping (same area, not deepening)

- `components/pill.tsx`, `components/gradient_bar.tsx` — pass-throughs; deletion test says complexity just moves. Inline or leave; low stakes either way.
- `components/reveal.tsx` stagger: callers hand-increment `delay={i * 0.05}` in loops (`app/projects/page.tsx:52`, `app/page.tsx:35-40`) — could accept an `index` prop for auto-stagger. Micro-deepening; bundle with this candidate if pursued.

## Settled

- **Q1 → (a)**: cheap named z-scale. Refinement from Round 1 rec: the tokens live in `components/components.css` as four `@utility` blocks (`z-backdrop: 0`, `z-content: 10`, `z-nav: 49`, `z-overlay: 50`) — Tailwind v4 has no `--z-*` theme namespace for auto-generation, and `@utility` is this codebase's established home for exactly this kind of token (content-max-width, underline-slide). Values stay byte-identical (49 stays 49); only names gain meaning. Call sites: `z-nav` (navigation_bar), `z-overlay` (resume_dialog + image_viewer), `z-content` (page_hero + app/page.tsx:62), `z-backdrop` (shader_backdrop). Internal z values (home_hero z-0/z-1, image_viewer controls) untouched — local layering, no cross-file meaning. **Built as described.**
- **Q2 → yes**: stacking only. Width already tokenized (definitions in `components.css`); rhythm declined — per-page by design, no failure story.
- **Q3 → (a) dropped**: owner's call — "an extra index prop might cause confusion in the future". `Reveal` untouched; decline recorded in ADR-0008.
- **Q4 → yes**: **ADR-0008** (`docs/adr/0008-stacking-order-named-tokens.md`) — names the two contracts, records the internal-z carve-out, the width/rhythm declines, and the Reveal-stagger decline.

## Log

- 2026-09-05 — queued from architecture review.
- 2026-09-05 — In design. Fact-check: z-49 (`navigation_bar.tsx:65`), z-50 overlays (`resume_dialog.tsx:84`, `image_viewer.tsx:70`), page-hero `z-10` (`page_hero.tsx:16`) + same content-over-backdrop intent in `app/page.tsx:62` and `shader_backdrop.tsx:51` (z-0). Corrections: (1) width tokens ALREADY have a single definition home — `components.css:9-16` owns both `content-max-width` utilities; call sites use names, so the width half of the friction is already solved; (2) internal z values (`home_hero` z-0/z-1, `image_viewer` controls z-10, shadcn `isolate z-50`) are local layering, not cross-file contracts — out of scope. Reveal stagger: 3 call sites, home's two are non-uniform (0.05/0.1).
- 2026-09-05 — Round 1 settled: q1a (tokens in components.css as @utility, values unchanged), q2 stacking-only, q4 ADR yes; q3 re-explained.
- 2026-09-05 — Q3 → (a) dropped (owner: index prop might cause future confusion). Frontier empty → built: 4 @utility z tokens in components.css, 6 call-site renames (z-nav, z-overlay ×2, z-content ×2, z-backdrop), zero leftovers, values byte-identical. ADR-0008 written.
