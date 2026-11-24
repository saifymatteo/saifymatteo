# Portfolio CMS (local only)

Independent Next.js + Payload app. It does not import the portfolio frontend at runtime, share its build directory, or deploy anything. Its content import corpus lives in `content/` (moved out of the site package — the site is strict-CMS, ADR 0011); the seed, the disposable integration check, and the site's highlighting prebuild read it, along with `../nextjs/public/` assets.

## Start here

Requires Node **^22.23.5, ^24.22.3, or >=26.13.1**, matching the installed Payload 3.94.0 engine requirement (not merely Next's lower minimum). Verified locally with Node 26.13.1. Payload packages are pinned together; Next 16.4.6 satisfies `@payloadcms/next`'s installed peer range.

1. From this directory, install and prepare local storage:
   ```sh
   npm install
   npm run setup
   ```
   `setup` creates ignored `data/`, `uploads/`, and a mode-0600 `.env` with a cryptographically random secret. It **never overwrites an existing `.env`**. `.env.example` documents the settings. `PAYLOAD_SECRET` must contain at least 32 characters; there is no fallback secret.
2. Start the CMS:
   ```sh
   npm run dev
   ```
   Open <http://localhost:3002/admin>. The server binds to loopback only. On a fresh database, use Payload's normal **Create first user** screen with your own email/password. There is no default account, public signup, or seed password. All users in this minimal app are trusted admins.
3. In another terminal, from this directory, import the current portfolio:
   ```sh
   npm run seed
   ```
   The seed requires an existing admin, publishes imported projects, and never creates a user. It preserves raw case-study content, original ordering, authored labels/dimensions, and exact case-sensitive asset paths. It uploads only allowlisted image types from real paths inside `nextjs/public/assets/`. Logos, dark logos, covers and galleries become native Media relationships.
4. Check the frontend contract:
   ```sh
   curl -i http://localhost:3002/api/portfolio
   ```
   Start the existing portfolio with CMS reads enabled:
   ```sh
   cd ../nextjs
   PAYLOAD_CMS_URL=http://localhost:3002 npm run dev
   ```
   Open <http://localhost:5173>. Publish a Project edit in the CMS and reload its portfolio page. This app uses `PAYLOAD_PUBLIC_SERVER_URL` for canonical media URLs; the portfolio uses its own server-only `PAYLOAD_CMS_URL` to select the content source. Leaving that variable unset preserves the local TypeScript content. See [the integration guide](../nextjs/docs/payload-cms.md) for vinext startup, the failure policy, and production caveats.

## Editing images and previewing

**Replace a logo or cover** (admin UI, `cms.<domain>/admin`):

1. Open the project → the `Logo` / `Logo Dark` / `Cover` field.
2. Click the **×** on the current image, then **Create New** to upload a file
   (or **Choose from existing** to reuse one in Media).
3. Watch the **Live Preview** tab, then **Publish**. The site shows it within 60 s.

Uploads get a new filename even if the name matches, so cached old images
never stick. Deleting the old file in **Media** is optional.

**Add images to a section:** project → **Contents** → the section → **Media**
→ **Add Media** → label (alt text) + image. Width/height are optional
(read from the file).

**Live Preview** (the eye/tab beside *Edit*): renders the real portfolio
page from the current draft; autosave refreshes it as you type. Needs
`PAYLOAD_PREVIEW_SECRET` (same value on CMS and Worker) and
`PORTFOLIO_PREVIEW_ORIGIN` (`https://saifulmashuri.com`, or
`http://localhost:5173` locally). Nothing reaches the public site until
**Publish**.

**Via the seed corpus instead** (`content/*.ts`): put the WebP under
`nextjs/public/assets/portfolios/<project>/` and reference it as
`{ label, src: '/assets/portfolios/<project>/<file>.webp', width, height }`
in a section's `media`; then `npm run seed -- --update` (overwrites admin edits
to those projects). Run it with `NODE_ENV=production` against any database
that production will open, or Payload's dev push marks it and production
halts at a prompt.

## Content and permissions

- **Users:** authenticated-admin-only CRUD. Payload's first-user bootstrap bypasses create ACL only while no user exists. No roles: every authenticated user is an admin. Do not create accounts for untrusted contributors.
- **Projects:** required project text, validated kebab-case unique slug, visible numeric `order` (position in the site, lowest first — the admin list and the portfolio endpoint sort by it; ties break by id; editors reorder by editing the number), optional category/date/status/logos/cover, tech-stack rows, links and structured raw case-study sections (paragraphs, code, links and image rows). Cover is an optional array with at most one image. No rich-text editor, blog, or page builder. Drafts and up to 50 versions per document are enabled. Public collection reads are restricted to published content; admins can edit drafts.
- **Media:** public reads; admin-only uploads/updates/deletes. Disk uploads use Sharp metadata for intrinsic dimensions. Image rows may retain authored width/height; otherwise the API uses uploaded intrinsic dimensions. Only JPEG, PNG, WebP, AVIF, GIF and SVG MIME types are accepted. **SVG uploads are trusted-admin-only content, not an arbitrary public upload facility**; never embed them as HTML/object/iframe. Review SVGs before uploading.
- Link fields and supported inline Markdown links allow HTTP(S), `mailto:`, root-relative paths and fragments, rejecting executable schemes, protocol-relative URLs, credentials and whitespace/control characters. Code blocks remain literal source text.

Seed reruns skip existing project slugs (including drafts) **without changing any authored content**. Media is deduplicated by stable `sourcePath`. A partial failed run can be rerun: previously uploaded images are reused. It deliberately fails for missing/escaped/unsupported assets; it does not silently drop content. Run only one seed at a time. Existing media with a matching sourcePath is trusted and preserved rather than replaced. It is an initial import, not an ongoing content synchronizer.

## Exact portfolio API

`GET /api/portfolio` returns JSON, with `Cache-Control: no-store`:

```ts
{ projects: ProjectContent[] }

type ProjectContent = {
  slug: string;
  category?: 'professional' | 'personal';
  title: string;
  tagline: string;
  description: string;
  summary: string;
  platform: string;
  role: string;
  date?: string;
  status?: 'COMPLETED' | 'ONGOING' | 'ARCHIVED';
  techStack: string[];
  logo?: string;       // absolute CMS URL
  logoDark?: string;   // absolute CMS URL
  cover?: Image;
  links: Link[];
  caseStudy: {
    title: string;
    kind?: 'preview' | 'text';
    body?: string[];
    code?: { label: string; source: string }[];
    links?: Link[];
    media?: Image[];
  }[];
};
type Image = { label: string; src: string; width: number; height: number };
type Link = { label: string; href: string };
```

Only published projects are returned **even when authenticated**. The endpoint explicitly uses `draft: false`, a published filter, and `overrideAccess: false` with the incoming Payload request. Sorting is ascending numeric `order` (the position field on each project), then ascending numeric `id`; pagination is drained. The latest unpublished version of an already published project is not exposed. There are no Payload row IDs, timestamps, relationship objects, ordinals, preview filtering or render-time transforms in the response. Optional empty section arrays are omitted.

Every image `src`, `logo` and `logoDark` is absolute against `PAYLOAD_PUBLIC_SERVER_URL` (default `http://localhost:3002`). That setting must be an HTTP(S) origin, not a path. Missing media relationships, malformed dimensions or database failures log an error and return **500** with `{ "error": "Portfolio content is temporarily unavailable." }`, never a fake successful empty list. A genuinely empty published collection returns `{ "projects": [] }`.

## Verification and generated files

```sh
npm run test              # small mapping, validation and endpoint tests
npm run test:integration  # disposable SQLite + upload dir; needs sibling nextjs assets
npm run typecheck
npm run build
npm run generate:types
npm run generate:importmap
```

The integration check creates a random test admin only inside a new temporary database, imports all current content, compares the full API round trip, checks ACLs/draft isolation, the stable order/id tie-break and repeat-seed preservation, then removes its database/uploads. It never seeds your local database. `src/payload-types.ts` and the admin import map are generated from Payload config. Type checking uses the template-style `skipLibCheck` because upstream declaration files produce errors when checked as application code.

Production runs the `Dockerfile` (Next standalone output) on the Oracle VPS; the deployment reference is `$MATTEO_SETTINGS/server_vps/saifymatteo/AGENTS.md`. The image excludes `content/`, `scripts/` and `tests/` (they import the sibling `nextjs/` package): seed and verify from a dev checkout only. No production email service is configured: Payload writes reset emails to the server console (`docker logs`); keep those logs private.

**Migrations.** Dev (`npm run dev`) schema-pushes; production (`NODE_ENV=production`) never does and instead applies `src/migrations/` on boot via `prodMigrations`. After any collection or field change, run `npx payload migrate:create <name>` and commit the generated files, or production keeps the old schema. `20261123_142432_initial` is the baseline and was verified to produce a schema identical to the trial database.

### Dependency audit

The lockfile uses Sharp 0.35.5 and a narrow `monaco-editor -> dompurify ^3.4.18` override to avoid known vulnerable versions. At implementation time `npm audit` still reports **18 transitive findings (14 high, 4 moderate)**, rooted in `picomatch` ReDoS and the older development-only `esbuild` brought in through Payload/Drizzle tooling. The installed latest Payload release provides no compatible automatic fixes for these remaining chains; no broad forced upgrades were applied. Re-run `npm audit` before any exposure beyond loopback. This is not a production security sign-off.

## Local data and backups

- Default SQLite: `data/payload.db` (`DATABASE_URI=file:./data/payload.db`).
- Default original uploads: `uploads/`. Optional `PAYLOAD_UPLOAD_DIR` changes the disk directory (also used by the disposable integration check).
- Secret/canonical origin: ignored `.env`; copy settings from `.env.example` only when needed, never the real secret into Git.

Stop the CMS and any seed process before backing up **the whole `data/` directory, `uploads/`, and `.env` together** (including any SQLite WAL/SHM files). Restore that matched set while the app is stopped, with restrictive permissions. Keep the secret stable across restarts. Backups contain private user authentication data and must remain private. Do not back up only the database: image files are not stored in SQLite. Ignore rules exclude local secrets, SQLite files, uploads, dependencies and build output from Git.

Official references used: [blank app template](https://github.com/payloadcms/payload/tree/main/templates/blank), [SQLite adapter](https://payloadcms.com/docs/database/sqlite), [access control](https://payloadcms.com/docs/access-control/overview), [custom endpoints](https://payloadcms.com/docs/rest-api/overview). Installed package engines/peer metadata and bundled Next docs are the compatibility source of truth for this local setup.
