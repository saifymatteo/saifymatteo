# Deployment on Cloudflare Workers via vinext

The portfolio ships as a Cloudflare Workers application built with `vinext` (Cloudflare's Vite-based Next.js runtime), deployed only by git tags through GitHub Actions. This replaces the previous deployment story: the site was built with Next's own toolchain and pushed manually, and the domain previously served the retired `flutter_web` Worker of the same name.

## Context

The site is a portfolio with 15 prerendered pages and two server route handlers (`/api/send` contact email, `/api/resume` PDF proxy) — a static export is impossible; a server runtime is required. Constraints and facts that shaped the decision: the Cloudflare account is on the **free plan**; DNS for `saifulmashuri.com` (apex + www) already lives in Cloudflare; this project **replaces** `flutter_web`, whose Worker (`saiful-mashuri`) will be deleted and its name and domain recreated here; and the project runs Next.js 16 with React Compiler, Tailwind v4, and no middleware, ISR, cacheComponents, or Pages Router.

Vehicles evaluated:

- **OpenNext Cloudflare adapter** — the mature standard, but lives in-repo (`open-next.config.ts`, pinned Next-version compatibility) and its image story on the free plan also ends at `unoptimized`.
- **Netlify** — battle-tested native Next runtime with zero in-repo adapter, and an existing Netlify site exists; but it would keep the portfolio on two platforms forever and add a foreign vendor to an already-Cloudflare-hosted domain.
- **vinext on Workers** — Cloudflare's current recommendation; reimplements the Next.js API surface on Vite with native Workers integration (`@cloudflare/vite-plugin`, one-command deploy). Younger ("use with caution" per its own FAQ), but the supported-feature matrix covers this project fully, its migration is non-destructive (`next dev`/`next build` keep working), and it completes the single-platform endgame.

## Decision

**Cloudflare Workers + vinext**, with these settled mechanics:

- **Tag-gated deploys only**: a release tag `release/nextjs/v*` deploys and promotes to 100% of production traffic on the single Worker `saiful-mashuri` (custom domains apex + www attached via the config's `routes`); a dev tag (`dev/nextjs/v*`) uploads an **unpromoted version** that is inspectable at its per-version Preview URL and never touches production traffic. No local deploy script, no push-to-main deploys, and — after an amendment during implementation — **no separate staging Worker**: Worker Versions' built-in per-version preview URLs replace it.
- **Checks workflow** (prettier, eslint, tsc, `node --test`, build) runs on pushes/PRs; the deploy workflow reruns the full battery before deploying.
- **Worker secrets** (`RESEND_API_KEY`, `TURNSTILE_SECRET`) via one-time local `wrangler secret put`; CI never sees them. CI auth = `CLOUDFLARE_API_TOKEN` ("Edit Cloudflare Workers" template) + `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets.
- **Cutover**: the user deleted the retired flutter_web Worker (and the interim staging Worker); the Next Worker `saiful-mashuri` was recreated with the custom domains attached and serves the domain.
- **Rollback** via `wrangler rollback` / the Cloudflare deployments list.

## Consequences

Accepted trade-offs: `next/image` renders local images as `<img>` + responsive `srcSet` without optimization or resizing — production shows the optimizer route is a 302 pass-through to the original file (a wasted round trip on every image; the Phase 1.5 plan proposes `unoptimized` + `fetchpriority`) — and `next/font/google` self-hosts at build time under `/_next/static/_vinext_fonts/` (the original "loads from the Google CDN" caveat was disproven by the 2026-09-06 Lighthouse network log: every font request is same-origin; the remaining font cost is weight count, trimmed to the declared ladder in Phase 2); vinext's gaps ("with caution") are mitigated by `vinext check` gating the migration, the non-destructive dual toolchain, and the fallback option of Netlify/OpenNext being one decision away if a blocker appears. The tag becomes the source of truth for the deployed version; `package.json` bumps are an optional chore commit at release time. Rollback of the migration itself is trivially cheap since the Next toolchain remains installed alongside vinext.
