# One place for stacking and width rules

**Status:** Open (queued, priority 4) · **Strength:** Speculative · **Dependency category:** in-process
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

(nothing yet)

## Log

- 2026-09-05 — queued from architecture review.
