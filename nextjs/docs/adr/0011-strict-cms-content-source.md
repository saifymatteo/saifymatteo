# Project content comes strictly from the Payload CMS

Date: 2026-11-22
Status: Accepted
Supersedes: ADR 0003 (TypeScript data over Markdown) for project content —
typed data stays, but the site no longer serves projects from local files.

## Context

ADR 0003 kept project content as typed TypeScript data in `lib/projects/*.ts`.
The Payload CMS trial (see `docs/payload-cms.md`) duplicated that content into
an editable database, with `getProjectCatalog` switching between a local
catalog (URL unset) and the CMS (URL set). Running both sources made the data
flow confusing: two categories of projects (professional, personal) crossed
with two display surfaces (curated home-page preview, full listing/detail)
had no explicit naming, and the local fallback could silently show stale
content after CMS edits.

## Decision

1. **Strict CMS source.** `getProjectCatalog` reads only the CMS. A missing
   `PAYLOAD_CMS_URL` is treated exactly like an unreachable CMS: empty project
   content plus a logged cause on every affected render — pages never 500.
   `scripts/check-cms.mjs` remains the hard gate at deploy time.
2. **The local registry stops being site content.** The authored content
   files moved to `payloadcms/content/` — they are now the seed/import corpus
   only (read by `payloadcms/scripts/seed.ts`, the integration check, and the
   offline highlighting prebuild). The site package holds no project content.
3. **Explicit display naming.** Catalog accessors are named
   `project<Type><Display>`: `projectProfessionalCurated` (home-page Featured
   Works: first three professional projects in content order),
   `projectPersonalCurated` (home-page personal preview tile: first personal
   project in content order), `projectProfessionalFull` / `projectPersonalFull`
   (the `/projects` listing sections and the pools behind detail lookups).
   Cross-cutting lookups (`getProject`, `getAdjacentProjects`,
   `getCaseStudySections`, `projectStats`) keep their names; category only
   decides where a project appears, never whether its detail page exists.

## Amendment (2026-11-22, later the same day)

Ordering reverted from Payload's experimental `orderable` drag-and-drop to
the plain numeric `order` field: drag-and-drop's hidden `_order` field is
non-queryable, so stale admin list preferences/URLs sorting by hidden fields
blank the admin list silently, and drag refused outside its own sort. "Order"
now means the visible numeric field (lowest first, ties by id) everywhere —
admin list, portfolio endpoint, site. The display naming above is unchanged.

## Amendment (2026-11-23): production hosting and outage tolerance

The CMS is self-hosted on the Oracle VPS (Docker Compose, SQLite, disk
uploads) at a Cloudflare-proxied `cms.<infra domain>`; the Worker stays the
only public renderer. R2/D1 were rejected: R2 has no hard spending cap, and
Payload itself cannot run on Workers Free (10 ms CPU). Only hard-capped free
products are used, so nothing can bill.

"Strict CMS" is unchanged — the CMS is still the only content source — but
the Worker now keeps copies _of CMS responses_ (`lib/projects/catalog_cache.ts`):
a per-colo Cache API entry fresh for 60 s, and a Workers KV `last-good` copy
written only when content changes. When the VPS is down or returns invalid
data, the last-good copy is served (logged); the empty-content path only
happens when no copy exists yet. Media is edge-cached via a Cloudflare Cache
Rule (`Cache-Control: immutable` from Payload). Publish latency is ≤ 60 s.

## Consequences

- A deployment without the CMS variable renders structurally complete pages
  with empty project sections and visible "no published projects yet" state.
- Fresh local setup is: run the CMS, run `npm run seed` (in `payloadcms/`),
  then start the site. There is no content-only mode of the site anymore.
- The corpus files import their types from `nextjs/lib/projects/projects.ts`
  (one-way dependency: payloadcms → nextjs types).
- Empty-content state is intentional and logged, so a silently broken CMS
  shows up in server logs rather than as a subtly wrong site.
