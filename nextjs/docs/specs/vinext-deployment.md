# Deploy the Next.js portfolio on Cloudflare Workers via vinext with tag-gated deploys

## Problem Statement

The Next.js portfolio — the replacement for the retired flutter_web site — currently has no CI/CD: deploys are manual and the site has no permanent home on the owner's existing Cloudflare infrastructure. The owner wants deploys to be deliberate (gated by git tags, never by pushes), wants a staging environment to verify releases before production, and wants the site to take over the `saifulmashuri.com` domain (apex + www) from the flutter_web Worker on the free Cloudflare plan.

## Solution

Migrate the build to **vinext** (Cloudflare's Vite-based Next.js runtime, non-destructively) and deploy to **Cloudflare Workers** through GitHub Actions triggered only by Release tags: beta tags deploy to a **Staging** Worker for verification, stable tags deploy to production (Worker `saiful-mashuri`, later carrying the apex + www custom domains). Every deploy and every push/PR runs the full check battery. Application code stays unchanged; Worker secrets live in Cloudflare, and CI holds only two non-app secrets.

## User Stories

1. As a site owner, I want Deploys triggered only by Release tags, so that production never changes unless I deliberately cut a release.
2. As a site owner, I want a Staging Worker, so that I can verify a release on workers.dev before it serves the real domain.
3. As a site owner, I want beta tags to target Staging and stable tags to target production, so that the tag format itself encodes the environment.
4. As a site owner, I want the full check battery to run before every Deploy, so that a failing build can never reach a Worker.
5. As a site owner, I want a checks-only workflow on pushes and PRs, so that regressions surface before release time.
6. As a site owner, I want app secrets (Resend, Turnstile) stored as Worker secrets in Cloudflare, so that they never live in the repo or CI.
7. As a site owner, I want CI to need only two non-app secrets, so that a CI token leak has bounded blast radius.
8. As a visitor, I want the site served from Cloudflare's edge with identical design and behavior, so that the vehicle migration is invisible to me.
9. As a visitor, I want images to keep working with responsive markup, so that pages render correctly on any device.
10. As a visitor, I want the contact form and resume download to work on Workers, so that server features survive the migration.
11. As a site owner, I want route handlers to keep reading `process.env`, so that server code needs no changes for the new runtime.
12. As a site owner, I want rollback via wrangler or the dashboard, so that a bad release reverts in one command.
13. As a site owner, I want the migration to be non-destructive, so that the Next.js toolchain keeps working if vinext hits a blocker.
14. As a developer, I want a vinext dev script alongside the Next.js one, so that I can compare behavior during the transition.
15. As a maintainer, I want the vehicle decision and mechanics documented (ADR + glossary), so that future decisions have context.
16. As a site owner, I want the deployed version's source of truth to be the Release tag, so that releases need no bookkeeping commits.
17. As a site owner, I want the flutter_web Worker retirement to be a single dashboard action on my side, so that cutover timing stays in my control.
18. As a visitor, I want `saifulmashuri.com` and `www` to serve the Next.js site after cutover, so that the domain keeps working unchanged.
19. As a CI maintainer, I want the Deploy workflow to fail loudly when any check fails, so that no partial state ships.
20. As a site owner, I want no local deploy script, so that there is exactly one Deploy path (tags).

## Implementation Decisions

- **Vehicle**: vinext with `@cloudflare/vite-plugin` on Cloudflare Workers (ADR-0004). Migration via `vinext init --platform=cloudflare` — installs runtime packages, generates the Vite config and `wrangler.jsonc`, adds dev/build/start scripts, and keeps the Next.js toolchain working alongside.
- **Migration gate**: `vinext check` runs first and its report gates the migration; a reported blocker reopens the vehicle decision (Netlify and OpenNext remain one decision away).
- **Workers**: production Worker named `saiful-mashuri` (recreated after the owner deletes the retired flutter_web Worker of the same name); Staging Worker `saiful-mashuri-staging` defined as a `wrangler.jsonc` environment.
- **Tag → environment mapping**: one workflow listens on `dev/nextjs/v*` and `release/nextjs/v*`; `release` tags deploy production (promoted to 100% of traffic), `dev` tags deploy an unpromoted version inspectable at its per-version Preview URL. No local deploy script and no manual workflow dispatch exist — tags are the only Deploy path.
- **Workflows**: a checks-only workflow (prettier + eslint + tsc + node tests + build) on pushes and PRs; the deploy workflow reruns the full battery, then runs the vinext Cloudflare deploy command.
- **Secrets**: `RESEND_API_KEY` and `TURNSTILE_SECRET` are one-time local `wrangler secret put` calls, persisting across deploys; `TURNSTILE_HOSTNAMES` (non-secret) becomes a plain vars entry in `wrangler.jsonc`. CI auth uses `CLOUDFLARE_API_TOKEN` (from the "Edit Cloudflare Workers" token template) and `CLOUDFLARE_ACCOUNT_ID` as GitHub repository secrets — both already added; local `wrangler login` already done.
- **Images**: `next/image` usage is unchanged; local images render as plain images with responsive srcSet and no optimization or resizing. The paid Images binding is a future unlock, not a default.
- **Fonts**: `next/font/google` degrades to runtime Google-CDN loading (no build-time subsetting or self-hosting) — accepted.
- **React Compiler**: enabled through the Vite plugin's opt-in flag plus its transform package, replicating the current `reactCompiler` behavior.
- **Server env access**: route handlers keep reading `process.env` (Node compatibility flag); switch to the Workers-native env import only if runtime verification shows it's required.
- **Next.js config**: the existing config is parsed by vinext as-is; no unoptimized flag is added.
- **Cutover sequence**: staging verified on workers.dev → owner deletes the flutter_web Worker → apex + www custom domains declared for the production Worker → stable tag goes live. Rollback is `wrangler rollback` / the dashboard deployments list.
- **Versioning**: the Release tag is the source of truth for the deployed version; `package.json` bumps are an optional chore commit at release time.
- **Docs**: ADR-0004 (vehicle + mechanics) and the Deployment glossary section (Worker, Deploy, Release tag, Staging) are already written.

## Testing Decisions

- **No new test seams.** This feature's surface is declarative (workflows, `wrangler.jsonc`) and procedural (cutover), not unit-testable logic; the ideal number of new seams here is zero.
- **Existing battery reused as CI gates**: prettier + eslint, tsc, the node test suite (8 tests), and the production build — run identically locally and in CI.
- **Runtime verification is procedural and staging-first**: local vinext build + production server + browser smoke checks (per the established browser-verification pattern), then a Staging Deploy verified on workers.dev, and only then a stable tag to production.
- **Prior art**: the theme test suite (Node's built-in test runner with type stripping) is the only existing test module and continues to gate unchanged.

## Out of Scope

- Deleting the flutter_web Worker and removing its deploy script/pipeline from the repo (owner action now; separate cleanup task later).
- The paid Cloudflare Images binding or any image-payload optimization work.
- Traffic-aware pre-rendering (experimental) and any custom Vite plugins beyond vinext defaults.
- DNS record changes beyond attaching the existing apex/www names to the new Worker.
- Local deploy scripts or manual workflow dispatch (deliberately dropped).

## Further Notes

- `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub secrets and local `wrangler login` are already in place.
- The vinext Agent Skill guides the implementation; `vinext check` is its first step.
- The only downtime window at cutover is between the flutter_web Worker deletion and the first successful production Deploy; staging verification beforehand keeps that window short.
- If the production Worker name is still occupied at deploy time, deployment stops until the owner deletes the old Worker — no overlap is possible on one name.

## Amendment (post-implementation, owner-driven)

After the first staging deploy, the owner deleted **both** Workers (`saiful-mashuri` and `saiful-mashuri-staging`) and directed a single-Worker topology:

- One Worker, `saiful-mashuri`; the `wrangler.jsonc` environments were removed. `workers_dev: true` plus top-level `routes` (apex + www custom domains) and `vars` (`TURNSTILE_HOSTNAMES: saifulmashuri.com,www.saifulmashuri.com`) apply to the one Worker.
- The Staging Worker is replaced by **Worker Versions previews**: a `-beta.*` tag runs `wrangler versions upload --config dist/server/wrangler.json` (unpromoted; inspect at its Version Preview URL, surfaced in the workflow run summary), while a stable tag runs the full `vinext-cloudflare deploy` (upload + promote to 100%). The beta gate's purpose — look before live — is unchanged; only the mechanism moved from a separate Worker to an unpromoted version.
- `actions/checkout` and `actions/setup-node` were bumped to v5 (Node-20 deprecation annotations).
- Worker secrets were re-created on the recreated Worker (the worker deletion removed them).
- Deploy gating moved to prefix-based tags: `release/nextjs/v*` deploys and promotes to 100% of production traffic, `dev/nextjs/v*` uploads an unpromoted version (Preview URL in the run summary). The `-beta.*` suffix scheme above is retired — the tag prefix alone encodes the environment. CI runs the identical check battery (including `npm run test`) in both modes.
