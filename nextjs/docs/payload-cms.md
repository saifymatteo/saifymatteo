# Local Payload CMS trial

The independent app is in [`../../payloadcms/`](../../payloadcms/README.md).
It owns editing, a local SQLite database, and uploaded media; its content
import corpus lives in `payloadcms/content/`. The existing
portfolio owns rendering; its design and case-study section rules are unchanged.
The CMS README covers installation, first-admin creation, and importing content.
No production host is selected and nothing is deployed by this integration.

## Select a content source

The portfolio is strict-CMS (ADR 0011): projects come only from the running
CMS. With `PAYLOAD_CMS_URL` unset or the CMS unreachable, pages render with
empty project sections and a logged cause — never a 500. To serve content,
start the CMS on port 3002 and run the site. The CMS seed corpus lives in
`payloadcms/content/` (no site-side content files).

With the variable in an ignored `nextjs/.env.local` file, both dev runtimes
pick it up:

```dotenv
PAYLOAD_CMS_URL=http://localhost:3002
```

Then run `npm run dev` (port 5173) or `npm run dev:vinext` (port 3001). The
Cloudflare Vite runtime does **not** inherit arbitrary shell variables by
default: a shell prefix alone can silently leave it with empty content. `.env.local` is merged with the
existing `.env` by both runtimes, without changing its secrets. If you use a
`.dev.vars` file instead, Cloudflare ignores `.env*`; put the variable there.
Restart the server after changing environment files. This is a server-only
variable, not a `NEXT_PUBLIC_` variable. It must be an HTTP(S) origin without credentials, a path,
a query, or a fragment. The portfolio never sends CMS admin credentials.

## Publish and verify

1. Open <http://localhost:3002/admin> and edit an imported Project.
2. Save as a draft; the public site must still show the published version.
3. Publish the change and reload the portfolio page.
4. Check the project card, detail page, and `/sitemap.xml` for the new content.

Saving a draft is not publishing. New published slugs are resolved on demand.
Home Featured Works uses the first three published professional projects in CMS
order and safely handles fewer than three. Local source order remains the
ordering rule when CMS integration is disabled.

## Content contract

`GET {PAYLOAD_CMS_URL}/api/portfolio` returns `{ projects: ProjectContent[] }`,
ordered by the CMS, containing only published projects. Upload relationships are
resolved by the CMS into absolute URLs and intrinsic image dimensions. The
portfolio validates the response at its boundary, including links, dimensions,
required structures, and unique slugs, before creating one shared project
catalog for cards, metadata, sections, navigation, statistics, and sitemap.

`lib/projects/server.ts` is the server-only entry point. React request memoization
shares its catalog within one render; `cms.ts` contains the fetch/validation logic
so it can be tested without starting Next.js. `projects.ts` retains synchronous
local exports for existing tests, content tooling, and the import script.

## Failure and caching policy

- CMS requests use `cache: 'no-store'` and a three-second timeout. Locally
  (Node, no Worker bindings) every render fetches, so a publish shows on reload.
  On Workers, `lib/projects/catalog_cache.ts` serves a per-colo Cache API copy
  for 60 s and keeps a KV `CMS_CATALOG` last-good copy (ADR 0011 amendment):
  publishes appear within a minute, and a CMS outage serves the last good
  content instead of empty sections.
- When a configured CMS is unreachable, responds with an error, or returns invalid
  data **and no last-good copy exists**, `getProjectCatalog` serves an empty project catalog: the site stays up
  (home, listing, and sitemap render; case-study URLs 404) instead of failing
  with HTTP 500. The cause is logged to the server console on every failed
  fetch, and local projects are never resurrected as a fallback. Content
  validity is gated at deploy time by `scripts/check-cms.mjs`, which still
  hard-fails when the CMS is unreachable or returns invalid data.
- An intentionally empty published portfolio is valid; projects are not required
  to exist just to render the home page.
- Keep `PAYLOAD_CMS_URL` in the ignored `nextjs/.env.local` file. There is no
  local-content mode anymore (ADR 0011); a missing variable is logged like an
  unreachable CMS and the site renders its empty states.

## Production

The CMS runs on the Oracle VPS as a Docker Compose stack; the deployment
reference (Cloudflare proxy + Cache Rule, Caddy block, migration of the trial
data, backups) lives in `$MATTEO_SETTINGS/server_vps/saifymatteo/AGENTS.md`.

For the Worker:

1. Create the KV namespace once: `npx wrangler kv namespace create CMS_CATALOG`
   and put its id in `wrangler.jsonc` (replacing `REPLACE_WITH_KV_NAMESPACE_ID`).
2. Set the production variable: `npx wrangler secret put PAYLOAD_CMS_URL`
   (`https://cms.<infra domain>`). It is read at runtime; builds never fetch the CMS.
3. Before tagging: `PAYLOAD_CMS_URL=https://cms.<infra domain> node
--experimental-strip-types scripts/check-cms.mjs` against a local
   `wrangler dev` of the build.

The Cache API only works on the custom domains, not `*.workers.dev` previews:
previews fetch the CMS on every request (KV still applies). Outage behaviour
was verified with `wrangler dev`: CMS killed → all project pages still render
from KV, logged as `serving last-good copy`.

Blog Posts, visual page building, webhooks, and authenticated draft previews in
the portfolio are out of scope. Drafts can still be edited inside Payload.

## Missing fonts after switching operating systems

Vinext caches font CSS with absolute filesystem paths under `.vinext/fonts/`.
Reusing a Windows cache on Linux can leave `D:/...` font URLs in the rendered
page even though CSS and page requests succeed. Stop the portfolio dev server,
clear that generated cache, and restart (from `nextjs/`):

```bash
rm -rf .vinext/fonts
npm run dev:vinext
```

The fonts are downloaded again; project content, CMS uploads, and design tokens
are unaffected. Do not change font families or layout CSS to compensate for a
broken cache.

## Checks

```bash
cd nextjs
npm test
npx tsc --noEmit
npm run build:vinext
# With both apps running (default portfolio port: 3001):
node --experimental-strip-types scripts/check-cms.mjs
```

The read-only smoke check compares published CMS slugs with the sitemap, checks
all project pages and listing titles, and asserts missing projects return 404.
Run it after publishing a new project to catch a Worker silently using local
content. Set `PORTFOLIO_URL=http://localhost:5173` to check the Next.js dev server.

The existing browser design check also loads every declared font family/weight
and checks the rendered layout. With `agent-browser` installed and both apps
running, use it on the home, listing, and project pages:

```bash
SESSION="$(agent-browser session id --scope worktree --prefix cms-check)"
agent-browser --session "$SESSION" open http://localhost:3001/projects/sansols
agent-browser --session "$SESSION" eval --stdin < scripts/check-project-design.mjs
agent-browser --session "$SESSION" close
```

Do not interleave `next build` and `vinext build` in the same `.next` directory.
