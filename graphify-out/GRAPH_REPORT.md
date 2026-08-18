# Graph Report - saifymatteo  (2026-08-18)

## Corpus Check
- 83 files · ~504,076 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 643 nodes · 816 edges · 55 communities (40 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `62a025f1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app_localizations.dart
- projects.ts
- devDependencies
- menubar.tsx
- dependencies
- compilerOptions
- constants.dart
- home/page.dart
- iSarawakCare Workflow
- Flutter web portfolio
- _
- components.json
- State
- model.dart
- app/layout.tsx
- components/page.dart
- app.dart
- app_bar.dart
- route.dart
- StatelessWidget
- ../../../lib.dart
- text.dart
- localization.dart
- lib.dart
- package:flutter/material.dart
- components.dart
- app_state.dart
- web.dart
- Domain Docs
- PortfolioModel
- AppLocalizations
- native.dart
- route.ts
- Triage labels
- vm.dart
- Portfolio
- Scroll reveal
- Theme
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- graphify
- Case study
- Featured Works
- Brand gradient
- _ContactSection

## God Nodes (most connected - your core abstractions)
1. `_` - 44 edges
2. `cn()` - 25 edges
3. `compilerOptions` - 16 edges
4. `include` - 7 edges
5. `Flutter web portfolio` - 7 edges
6. `plain HTML portfolio (About)` - 7 edges
7. `Project` - 6 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CS50 coursework` --semantically_similar_to--> `Harvard CS50x`  [INFERRED] [semantically similar]
  plain_html/index.html → README.md
- `Flutter web portfolio` --semantically_similar_to--> `plain HTML portfolio (About)`  [INFERRED] [semantically similar]
  flutter_web/README.md → plain_html/index.html
- `Next.js portfolio site` --semantically_similar_to--> `Flutter web portfolio`  [INFERRED] [semantically similar]
  nextjs/README.md → flutter_web/README.md
- `Next.js portfolio site` --semantically_similar_to--> `plain HTML portfolio (About)`  [INFERRED] [semantically similar]
  nextjs/README.md → plain_html/index.html
- `Saiful Mashuri (saifymatteo)` --conceptually_related_to--> `Flutter web portfolio`  [INFERRED]
  README.md → flutter_web/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Portfolio Sites of saifymatteo** — nextjs_readme, flutter_web_readme, plain_html_index [INFERRED 0.85]
- **Portfolio Projects** — nextjs_context_sansols, nextjs_context_iscworkflow, nextjs_context_mykampusradio [INFERRED 0.85]
- **Agent Skill Docs** — agents_issuetracker, agents_triagelabels, agents_domaindocs [INFERRED 0.85]
- **iSarawakCare Workflow Portfolio** — flutter_web_assets_portfolios_isc_workflow_isc_home_isc_home, flutter_web_assets_portfolios_isc_workflow_isc_kgc_listing_isc_kgc_listing, flutter_web_assets_portfolios_isc_workflow_isc_landing_isc_landing, flutter_web_assets_portfolios_isc_workflow_isc_listing_isc_listing, flutter_web_assets_portfolios_isc_workflow_isc_logo_isc_logo [INFERRED 1.00]
- **MyKampus Radio Portfolio** — flutter_web_assets_portfolios_my_kampus_radio_mkr_home_mobile_mkr_home_mobile, flutter_web_assets_portfolios_my_kampus_radio_mkr_home_mkr_home, flutter_web_assets_portfolios_my_kampus_radio_mkr_logo_mkr_logo, flutter_web_assets_portfolios_my_kampus_radio_mkr_side_panel_mobile_mkr_side_panel_mobile, flutter_web_assets_portfolios_my_kampus_radio_mkr_side_panel_mkr_side_panel [INFERRED 1.00]
- **Sansols Portfolio** — flutter_web_assets_portfolios_sansols_sansols_employer_ap_details_sansols_employer_ap_details, flutter_web_assets_portfolios_sansols_sansols_employer_ap_listing_sansols_employer_ap_listing, flutter_web_assets_portfolios_sansols_sansols_gov_home_page_sansols_gov_home_page, flutter_web_assets_portfolios_sansols_sansols_landing_sansols_landing, flutter_web_assets_portfolios_sansols_sansols_logo_sansols_logo [INFERRED 1.00]

## Communities (55 total, 15 thin omitted)

### Community 0 - "app_localizations.dart"
Cohesion: 0.03
Nodes (66): app_localizations_en.dart, class, dart:async, aboutMe, aboutMeDescription, contact, contactMe, contactMeDescription (+58 more)

### Community 1 - "projects.ts"
Cohesion: 0.06
Nodes (31): contacts, metadata, AppProjectsPage(), metadata, AppIndividualProjectPage(), generateMetadata(), Props, CaseStudyBody() (+23 more)

### Community 2 - "devDependencies"
Cohesion: 0.05
Nodes (38): babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-prettier, devDependencies, babel-plugin-react-compiler, eslint (+30 more)

### Community 3 - "menubar.tsx"
Cohesion: 0.11
Nodes (30): Button(), buttonVariants, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel() (+22 more)

### Community 4 - "dependencies"
Cohesion: 0.06
Nodes (35): @base-ui/react, camera-controls, class-variance-authority, clsx, lucide-react, motion, next, dependencies (+27 more)

### Community 5 - "compilerOptions"
Cohesion: 0.06
Nodes (32): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+24 more)

### Community 6 - "constants.dart"
Cohesion: 0.07
Nodes (27): assets.gen.dart, C, emailAddress, harvardCs50xAddress, isMobile, kAppBarHeight, kAppBodyWidth, _Media (+19 more)

### Community 7 - "home/page.dart"
Cohesion: 0.07
Nodes (28): description, image, label, _onHoverHarvardCs50x, onTap, onTapCard, onTapSeeWhatIDo, title (+20 more)

### Community 8 - "iSarawakCare Workflow"
Cohesion: 0.15
Nodes (23): iSarawakCare Workflow, MyKampus Radio, Saiful Mashuri (Person), Sansols, SM Personal Brand, SM Logo Circle, SM Logo Rectangle, Saiful Mashuri Portrait (+15 more)

### Community 9 - "Flutter web portfolio"
Cohesion: 0.12
Nodes (22): Analysis options (relative imports), Localization config, auto_route, Provider, Flutter web portfolio, NextJS Portfolio Context, iSC Workflow, MyKampus Radio Unofficial App (+14 more)

### Community 10 - "_"
Cohesion: 0.10
Nodes (22): ../components/components.dart, dart:ui, _, allMedia, build, createState, _currentMedia, iscWorkflow (+14 more)

### Community 11 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 12 - "State"
Cohesion: 0.17
Nodes (16): _AboutSection, _AboutSectionState, _Button, _ButtonState, _MeSection, _MeSectionState, _PortfolioCard, _PortfolioCardState (+8 more)

### Community 13 - "model.dart"
Cohesion: 0.12
Nodes (15): description, highlights, icon, image, label, link, links, media (+7 more)

### Community 14 - "app/layout.tsx"
Cohesion: 0.15
Nodes (11): AppConstants, cookie, firaCode, firaSans, metadata, viewport, elsewhere, Footer() (+3 more)

### Community 15 - "components/page.dart"
Cohesion: 0.17
Nodes (12): BoxDecoration?, EdgeInsets?, AppState, BasePage, build, child, children, decoration (+4 more)

### Community 16 - "app.dart"
Cohesion: 0.17
Nodes (12): build, buildOverscrollIndicator, createState, _CustomScrollBehavior, _DeferredLoadingPlaceholder, getScrollPhysics, MyApp, _MyAppState (+4 more)

### Community 17 - "app_bar.dart"
Cohesion: 0.17
Nodes (12): _ActionButton, _ActionButtonState, build, createState, _isHover, labelText, MenuAppBar, onPressed (+4 more)

### Community 18 - "route.dart"
Cohesion: 0.17
Nodes (10): @AutoRouterConfig, AppRouter, defaultRouteType, routes, List, package:auto_route/auto_route.dart, RootStackRouter, route.dart (+2 more)

### Community 19 - "StatelessWidget"
Cohesion: 0.20
Nodes (11): @RoutePage, _Base, WebBodyBase, HomePage, _HeaderSection, _LinksSection, _MediaSections, _MediaSectionsItem (+3 more)

### Community 20 - "../../../lib.dart"
Cohesion: 0.25
Nodes (6): app.dart, components.dart, main, build, Footer, ../../../lib.dart

### Community 21 - "text.dart"
Cohesion: 0.29
Nodes (6): Color, BodyText, build, color, text, TitleText

### Community 22 - "localization.dart"
Cohesion: 0.33
Nodes (5): app_localizations.dart, AppLocalizations get, BuildContext, appL10n, AppLocalizationsContext

### Community 23 - "lib.dart"
Cohesion: 0.33
Nodes (5): app_state.dart, constants/constants.dart, localization/localization.dart, routes/routes.dart, vm/vm.dart

### Community 24 - "package:flutter/material.dart"
Cohesion: 0.33
Nodes (4): main, main, package:flutter/material.dart, package:flutter_test/flutter_test.dart

### Community 25 - "components.dart"
Cohesion: 0.40
Nodes (4): app_bar.dart, footer.dart, page.dart, text.dart

### Community 26 - "app_state.dart"
Cohesion: 0.40
Nodes (4): HomeSections, _scrollContext, updateScrollContext, Map

### Community 27 - "web.dart"
Cohesion: 0.40
Nodes (4): reloadPage, usePathUrlStrategy, package:flutter_web_plugins/url_strategy.dart, package:web/web.dart

### Community 28 - "Domain Docs"
Cohesion: 0.50
Nodes (4): Domain docs, Issue tracker, Domain Docs, Issue tracker: GitHub

### Community 29 - "PortfolioModel"
Cohesion: 0.50
Nodes (4): _PortfolioIscWorkflow, _PortfolioMyKampusRadio, _PortfolioSansols, PortfolioModel

### Community 31 - "AppLocalizations"
Cohesion: 0.67
Nodes (4): AppLocalizations, _AppLocalizationsDelegate, of, LocalizationsDelegate

## Knowledge Gaps
- **289 isolated node(s):** `links`, `elsewhere`, `fadeUp`, `ProjectStatus`, `_router` (+284 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `_` connect `_` to `constants.dart`, `State`, `model.dart`, `route.dart`, `StatelessWidget`, `../../../lib.dart`, `package:flutter/material.dart`, `PortfolioModel`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `AppConstants` connect `app/layout.tsx` to `projects.ts`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `links`, `elsewhere`, `fadeUp` to the rest of the system?**
  _289 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app_localizations.dart` be split into smaller, more focused modules?**
  _Cohesion score 0.029850746268656716 - nodes in this community are weakly interconnected._
- **Should `projects.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0597567424643046 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._