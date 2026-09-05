# Section invariant behind the content module

**Status:** Open (queued, priority 2) · **Strength:** Worth exploring · **Dependency category:** in-process
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

## Settled

(nothing yet)

## Log

- 2026-09-05 — queued from architecture review.
