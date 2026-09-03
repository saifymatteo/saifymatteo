# AGENTS.md

Monorepo with three independent projects under a GitHub profile README root.

## Project layout

| Directory | Tech | Notes |
|-----------|------|-------|
| `nextjs/` | Next.js 16 (App Router), Node 22, React 19, Tailwind v4, shadcn/ui, TypeScript | New portfolio WIP |
| `flutter_web/` | Flutter web (SDK 3.35.7 via puro), Dart 3.9, Provider, auto_route, Cloudflare Workers | Published portfolio site |
| `plain_html/` | Bootstrap 4 + jQuery static site | Legacy, not active |

Root is the GitHub profile README; never edit code there.

## Commands (run from project subdirectory)

### nextjs

```bash
npm run dev       # dev server on port 5173 (not 3000)
npm run build     # production build
npm run start     # serve production build
npm run format    # prettier . --write
npm run fix       # prettier . --write && eslint .
```

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

## Flutter_web architecture

- Entry: `lib/main.dart` — calls `usePathUrlStrategy()` then runs `MyApp`
- `lib/app.dart` — `MyApp` with `MultiProvider`, `MaterialApp.router`, theme/localization setup
- `lib/routes/route.dart` — `@AutoRouterConfig` with deferred loading, two routes: `/` (Home) and `/portfolio/:title`
- `lib/app_state.dart` — `AppState` stores scroll contexts per `HomeSections` enum
- `lib/constants/constants.dart` — barrel for theme + generated assets
- `lib/pages/` — `home/`, `portfolio/`, `components/` (shared widgets)
- `lib/vm/` — platform detection (`C.isMobile` etc.)
- Tests: `test/unit_test.dart`, `test/widget_test.dart`

## Next.js architecture (WIP — incomplete)

- `app/layout.tsx` — root layout with Inter, Fira Code, Cookie fonts
- `app/page.tsx` — home page with `AppNavigationBar` (uses `@base-ui/react` menubar, not shadcn)
- `app/projects/[slug]/` — dynamic project detail pages
- `app/contact/` — contact page with form; `app/api/send/route.ts` — Resend email API
- `app/constants/constants.tsx` — app constants; `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`
- `components/navigation_bar.tsx` — nav bar; `components/shadcn/` — button, dropdown-menu, menubar
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## CodeGraph

This project is indexed by CodeGraph — a SQLite database at `.codegraph/codegraph.db` (git-ignored, local to each machine), kept current by the CodeGraph daemon.

Rules:
- For codebase questions (architecture, flow, where-is-symbol, impact analysis), use the injected `codegraph_*` tools directly before grep/read: `codegraph_explore` first for broad questions, `codegraph_search` for symbol-name lookup, `codegraph_files` for project structure, `codegraph_node` for a known symbol, and `codegraph_callers` for impact/flow analysis.
- If `codegraph_search` returns no exact result, try `codegraph_explore` or `codegraph_files`/`codegraph_node` before falling back to grep/read; symbol search may miss literal constants or generated names that still exist in source text.
- Only use grep/read after CodeGraph is insufficient or when the user asks for literal text matching.
- If the db file is missing or `codegraph_status` reports problems, say so instead of silently falling back to grep.

## Agent skills

### Issue tracker

Issues live as GitHub issues, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five default labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `<project>/docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Notes

<!-- quick notes go here -->
