# AGENTS.md

Monorepo with three independent projects under a GitHub profile README root.

## Project layout

| Directory | Tech | Notes |
|-----------|------|-------|
| `nextjs/` | Next.js 16 (App Router), Node 24, React 19, Tailwind v4, shadcn/ui, TypeScript | Live portfolio at saifulmashuri.com — complete; bug fixes & performance only |
| `flutter_web/` | Flutter web (SDK 3.35.7 via puro), Dart 3.9, Provider, auto_route, Cloudflare Workers | Retired portfolio — Worker deleted, domain handed over to nextjs (ADR 0004) |
| `plain_html/` | Bootstrap 4 + jQuery static site | Legacy, not active |

Root is the GitHub profile README; never edit code there.

## Commands (run from project subdirectory)

### nextjs

```bash
npm run dev           # Next dev server on port 5173 (not 3000)
npm run dev:vinext    # vinext dev on port 3001 (Workers-parity runtime)
npm run build         # Next production build
npm run build:vinext  # vinext production build (outputs dist/server/ + wrangler.json)
npm run start         # serve Next production build
npm run test          # node --test --experimental-strip-types "tests/*.test.ts" (glob — new files picked up automatically)
npm run dims          # regenerate image dimension constants (scripts/image-dimensions.mjs)
npm run format        # prettier . --write
npm run fix           # prettier . --write && eslint .
```

### Deploy nextjs (CI-only, tag-gated)

Deploys run via GitHub Actions (`nextjs-deploy.yml`) on release tags — never deploy locally, never on push-to-main.

```bash
# Live: build, deploy, promote to 100% of production traffic
git tag release/nextjs/v1.0.0 && git push origin release/nextjs/v1.0.0
# Dev: uploads an unpromoted version, inspectable at its per-version Preview URL
git tag dev/nextjs/v1.0.0 && git push origin dev/nextjs/v1.0.0
```

- Worker: `saiful-mashuri` (apex + www custom domains). Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET`) set once via `wrangler secret put`. Rollback: `wrangler rollback` or the Cloudflare deployments list.
- Before tagging: `npm run build:vinext` and `vinext check` locally.

### flutter_web

```bash
flutter pub get
dart run build_runner build --delete-conflicting-outputs  # codegen: auto_route, flutter_gen
flutter test
flutter build web --wasm -t lib/main.dart --release --csp --base-href=/
```

### Deploy flutter_web

```pwsh
.\deploy.ps1   # bumps version, builds release, deploys to Cloudflare via wrangler, tags & pushes
```

## Key conventions

- **Conventional commits** with scope: `[flutter_web]`, `[nextjs]`, `[root]`
- **Flutter imports**: `prefer_relative_imports: true`, `always_use_package_imports: false` — use `../../foo.dart` not `package:flutter_web/foo.dart`
- **Prettier**: single quotes, trailing commas (es5), 80 char print width, Tailwind plugin
- **ESLint**: flat config (`eslint.config.mjs`), core-web-vitals + TypeScript + Prettier
- **shadcn/ui**: `base-luma` style, `@/` alias maps to nextjs root (not src), components live in `components/shadcn/` (components.json declares `ui` alias `@/components/ui`, but actual files are under `shadcn/`)

## Generated files (do not edit)

- `flutter_web/lib/routes/route.gr.dart` — auto_route
- `flutter_web/lib/localization/app_localizations_en.dart` — flutter localizations from arb
- `flutter_web/lib/constants/assets.gen.dart` — flutter_gen
- `nextjs/.next/` — Next.js build output
- `nextjs/dist/` — vinext build output (server bundle + generated wrangler.json)

## Next.js architecture (complete — bug fixes & performance only)

- `app/layout.tsx` — root layout: Fira Sans / Fira Code / Cookie via `next/font/google`, inline `THEME_BOOT_SCRIPT` (`lib/theme.ts`) to prevent theme flash, `MotionProvider` + nav + footer shell
- `app/globals.css` — Tailwind v4 (`@theme inline` tokens, tw-animate-css, shadcn base), light/dark tokens keyed off `[data-theme]`
- Pages: `app/page.tsx` (home), `app/projects/page.tsx` (all projects), `app/projects/[slug]/page.tsx` (case study), `app/contact/page.tsx`, `app/not-found.tsx`; `app/template.tsx` adds the page-mount fade
- `app/components/` — navigation_bar (shadcn menubar), footer, home_hero, page_hero, project_card, tech_stack, brand_logo, motion_provider
- `app/contact/components/` — contact_form (Turnstile human check), resume_dialog/resume_viewer (react-pdf)
- `app/projects/[slug]/components/` — case_study, case_study_preview (marquee media), image_viewer (lightbox)
- `app/api/send/route.ts` — contact email via Resend (client constructed lazily); `app/api/resume/route.ts` — resume PDF proxy
- `lib/projects/*.ts` — typed project content data (ADR 0003); `lib/tech_stack.ts`, `lib/theme.ts` (Theme choice state), `lib/utils.ts` — `cn()` helper
- `components/` — pill, marquee, reveal (Scroll Reveal), gradient_bar, shader_backdrop (three.js shader gradient); `components/shadcn/` — button, dropdown-menu, menubar (all built on `@base-ui/react`)
- `app/constants/constants.tsx` — app constants; SEO/PWA: `app/manifest.ts`, `app/robots.ts`, `app/sitemap.ts`
- Tests: `tests/theme.test.ts`, `tests/contact_submission.test.ts`, `tests/case_study_sections.test.ts` (node:test); `scripts/image-dimensions.mjs` — image dimension constants generator
- Domain glossary: `nextjs/CONTEXT.md`; ADRs: `nextjs/docs/adr/` (deployment = Cloudflare Workers via vinext, ADR 0004)

vinext caveats (ADR 0004) relevant to performance work: `next/font/google` loads from the Google CDN at runtime instead of build-time self-hosting; `next/image` renders plain `<img>` + responsive `srcSet` with no optimization/resize (Workers free plan).

## Flutter_web architecture

- Entry: `lib/main.dart` — calls `usePathUrlStrategy()` then runs `MyApp`
- `lib/app.dart` — `MyApp` with `MultiProvider`, `MaterialApp.router`, theme/localization setup
- `lib/routes/route.dart` — `@AutoRouterConfig` with deferred loading, two routes: `/` (Home) and `/portfolio/:title`
- `lib/app_state.dart` — `AppState` stores scroll contexts per `HomeSections` enum
- `lib/constants/constants.dart` — barrel for theme + generated assets
- `lib/pages/` — `home/`, `portfolio/`, `components/` (shared widgets)
- `lib/vm/` — platform detection (`C.isMobile` etc.)
- Tests: `test/unit_test.dart`, `test/widget_test.dart`

## Agent skills

### Issue tracker

Issues live as GitHub issues, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five default labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `<project>/docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Notes

<!-- quick notes go here -->
