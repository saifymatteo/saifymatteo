---
status: accepted
date: 2026-02-27
---

# TypeScript data files over Markdown for project content

> Note: this ADR extends/supersedes `0001-content-as-local-typed-data.md` (its sibling in this directory), the earlier project-level decision to keep content as typed TypeScript data.

The owner wanted to edit project content without touching code and considered migrating `nextjs/lib/projects/*.ts` to Markdown files (react-markdown + gray-matter, frontmatter + markdown body) hosted on Cloudflare Workers with rebuild-on-push. We decided to keep typed TypeScript data files: case-study pages are structured UI, not prose — the Preview section is a custom marquee+lightbox gallery, and cards, the case-study hero, and the sitemap need typed metadata that Markdown frontmatter would only awkwardly replicate.

## Considered Options

- **Markdown files with frontmatter** (react-markdown + gray-matter): rejected because Markdown conventions for galleries and special sections would require maintaining a custom parser — two systems (Markdown + custom parser) instead of one. The owner concluded Markdown is for documentation, not general website content with a pretty structured format.
- **Typed TypeScript data files** (chosen): schema is enforced by the compiler, and every consumer (cards, hero, sitemap) reads the same typed object.

## Consequences

- Content edits happen in TypeScript — acceptable, since Cloudflare Workers Builds rebuilds on push so updates go live in ~1-2 minutes.
- Richer content types (quotes, code blocks) are deferred until actually needed.
- Revisit this decision if content-editing pain grows.
