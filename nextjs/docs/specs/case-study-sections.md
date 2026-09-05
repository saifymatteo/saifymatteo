# Case-study Section invariants behind the content module

## Problem Statement

CONTEXT.md defines two Section invariants — ordinals are derived from position and never written by hand, and media-less Preview sections are excluded so numbering stays contiguous — but they were enforced in the page component by string-matching the domain term `'Preview'` against `section.title` in two separate places: a numbering filter and the render dispatch. The raw `caseStudy` array was public on `Project`, so the invariant had no home, no test, and nothing stopped the next page from reaching into section internals again. Featured Works selection (the home page's three cards) was implicit in array destructuring, with no stated rule for what happens when a fourth project lands.

## Solution

`lib/projects/case_study.ts` — a pure section-view module — owns the Section invariants. Content files mark previews with an explicit `kind: 'preview'` (omitted = text); `projects.ts` removes `caseStudy` from the public `Project` type (hard seam) and exposes `getCaseStudySections(project)` returning render-ready `SectionView`s (resolved kind, applied drop rules, contiguous position-derived ordinals), plus `getFeaturedProjects()` for the first three projects by module order. Storage is unchanged (ADR-0001, ADR-0003 respected): same content files, same folder, one type-annotation word and one `kind` line per project.

## User Stories

1. As a maintainer, I want the Section invariants in one tested module, so that numbering rules can't drift between data and rendering.
2. As a visitor, I keep seeing contiguous section numbers (01, 02, …) on every case study, with media-less Previews never leaving a gap.
3. As a site owner, I want to mark a section `kind: 'preview'` instead of relying on its title, so that renaming a section never breaks numbering or rendering.
4. As a site owner, I want to publish an all-text case study with no Preview and no images, so that a project without screenshots still renders with contiguous ordinals.
5. As a site owner, I want the home page to feature exactly the first three projects by module order, so that adding a fourth project touches only `lib/projects/` and appears on `/projects` automatically.
6. As a maintainer, I want `caseStudy` off the public `Project` type, so that TypeScript enforces the seam instead of convention.
7. As a maintainer, I want the invariants covered by node tests, so that content or logic regressions surface in `npm run test`.
