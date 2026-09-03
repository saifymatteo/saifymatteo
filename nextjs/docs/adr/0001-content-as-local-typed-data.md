# Content as local typed TypeScript data

The portfolio's project and case-study content lives in a typed local data module (`lib/projects/projects.ts`) that pages render from, instead of a CMS or MDX files. With three projects and mostly prose sections, a CMS adds hosting, auth and fetch layers for no benefit, and MDX's authoring advantages don't justify the tooling; a typed module keeps content next to the code, type-safe and trivially editable. If the portfolio grows beyond a handful of long-form case studies, this can be revisited — the pages only consume the `Project` shape, so a CMS would slot in behind the same types.

> Superseded/extended by `0003-typescript-data-over-markdown-for-project-content.md`, which records why TypeScript data was kept over a Markdown migration.
