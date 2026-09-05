# Section invariant behind the content module

**Status:** Built (2026-09-05) · **Strength:** Worth exploring · **Dependency category:** in-process
**Source:** architecture review 2026-09-05

## Friction

CONTEXT.md defines the invariant — _"Section: … rendered with an auto-generated ordinal — section numbers are derived from position, never written by hand"_ and _"Preview: … media-less Preview sections are excluded so ordinals stay contiguous"_. That invariant is currently enforced in a page component by string-matching a domain term.

**Evidence:**

- `app/projects/[slug]/components/case_study.tsx:64-71` — the page filters raw case-study data:
  ```ts
  // Drop Preview sections with no media so numbering stays contiguous.
  const sections = project.caseStudy.filter(
    (s) =>
      s.title !== 'Preview' || (s.media !== undefined && s.media.length > 0)
  );
  ```
  The domain term "Preview" is string-matched against `s.title` — the data and the invariant are coupled by a magic string, not by the content module.
- `case_study.tsx:83-84` — ordinals are hand-derived in the render loop: `const number = String(i + 1).padStart(2, '0')`.
- `lib/projects/projects.ts` — the content module exposes `Project` with a public `caseStudy: CaseStudySection[]` (15+ props wide), plus `getProject` / `getAdjacentProjects` / `projectStats`. It has no say over how Sections are interpreted.
- `app/page.tsx` (Featured Works) and `app/projects/page.tsx` consume `projects` directly; the home page picks wide/narrow cards by index.

**Locality measurement:** a rule change to Section numbering (e.g. a future "Pull Quote" section type, or Preview reordering) requires the page's filter + numbering to be edited; the invariant has no test. Adding a 4th Project requires only `lib/projects/<new>.ts` + one line in `projects.ts` — that part is already well-placed.

## Shape of the deepening (not yet designed — no interface decided)

The projects module stops being a raw data dump for Sections: it exposes purposeful, render-ready Section views — ordinal + kind (Preview vs text) + content — so the invariant lives in one tested place and the page stops knowing `CaseStudySection` internals.

## ADR relations

No conflict. ADR-0001 (content as local typed data) and ADR-0003 (TS data over markdown) govern _storage_, not the accessor interface; deepening the accessor leaves them untouched.

## Frontier to grill (draft — first round)

1. Where does the Section view logic live: inside `lib/projects/projects.ts` or a sibling module (e.g. `lib/projects/case_study.ts`)?
2. Does `caseStudy` stop being public on `Project` (hard seam), or stay public and the view is merely preferred? _(recommend hard seam — the string-match exists because the array is public)_
3. What replaces the `'Preview'` magic string — a discriminated `kind` field in the data (content files change) or a module-level convention? _(recommend `kind` in data; the three content files are typed and cheap to update)_
4. Does Featured Works selection (home page index-based picks) belong behind the same module as a query?
5. Test plan: node tests for contiguous ordinals, media-less Preview exclusion, media-less Preview mid-sequence, single-Section case study.

## Design tree — after Round 1

```
Case Study Sections (deepening)
├─ ✅ Module location ────── sibling lib/projects/case_study.ts (pure, mirrors contact_submission.ts)
├─ ✅ Seam hardness ──────── hard seam: caseStudy off public Project, tsc enforces (shape shown to user)
├─ ✅ Discriminator ──────── kind field in data; optional with default 'text' (3 Preview lines, zero tax on text sections)
├─ ✅ Featured rule ──────── featured = first 3 by module order, static max 3; rest go to /projects (4th project coming)
└─ ✅ Test plan ──────────── tests/case_study_sections.test.ts, mirrors contact_submission.test.ts
```

### User answers (Round 1)

- **Q1: (b)** — sibling module; "mirrors the pattern".
- **Q2: (a)** — hard seam; user asked to see the concrete shape; constraint: content changes must stay **1 place** — the existing `lib/projects/` folder, one file per project.
- **Q3: (a)** — `kind` field; driving fact: **next project may have no images**, so a media-less case study (all text, or no Preview at all) must be representable.
- **Q4** — featured projects are **static, max 3**, home page only; **all remaining projects go to /projects**; a 4th project will land. Concrete shape proposed: `getFeaturedProjects()` in the module (first 3 by array order) so home page never changes when #4 arrives.
- **Q5: yes** — mirror the existing test pattern.

## Settled

All decisions recorded above + **ADR-0006** (`docs/adr/0006-case-study-sections-module.md`) + **spec** (`docs/specs/case-study-sections.md`). Built as:

- `lib/projects/case_study.ts` (new) — `CaseStudySection`/`SectionView`/`SectionKind` types + `toSectionViews()` (the invariants, tested)
- `lib/projects/projects.ts` — `caseStudy` off public `Project`; internal `ProjectContent`; `getFeaturedProjects()`; `getCaseStudySections()` bridge; **node-test compatibility**: value imports inside `lib/projects/*.ts` need explicit `.ts` extensions (`import type` imports don't)
- content files ×3 — `: ProjectContent` + `kind: 'preview'` on the Preview section only (text sections untouched)
- `case_study.tsx` — `getCaseStudySections()` + `kind` dispatch; both `'Preview'` string-matches gone
- `app/page.tsx` — `getFeaturedProjects()`
- `tests/case_study_sections.test.ts` (new, 15 tests) + `npm run test` script

## Log

- 2026-09-05 — queued from architecture review.
- 2026-09-05 — In design. Fact-check upgrade: the `'Preview'` magic string appears **twice** in `case_study.tsx` — numbering filter (line 71) _and_ render dispatch (`section.title === 'Preview' ? <PreviewSection/> : <article/>`, line ~101). Both the numbering rule and the rendering rule are coupled to the title string. Home page featured picks confirmed as array destructuring (`app/page.tsx:13`).
- 2026-09-05 — Built. 42/42 tests (15 new), tsc 0 errors, eslint PASS, `next build` PASS, live pages verified identical (3 case studies: contiguous ordinals + marquee; home featured cards unchanged; /projects listing unchanged). Artifacts: ADR-0006 + spec `case-study-sections.md`. CONTEXT.md Featured Works updated with the max-3 rule.
