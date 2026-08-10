# Graph Report - saifymatteo  (2026-08-07)

## Corpus Check
- 74 files · ~669,360 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 867 nodes · 1089 edges · 59 communities (48 shown, 11 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb30f8ca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app_localizations.dart
- win32_window.cpp
- app_localizations_en.dart
- flutter_web Project
- menubar.tsx
- _
- GeneratedPluginRegistrant.swift
- dependencies
- compilerOptions
- constants.dart
- devDependencies
- _
- my_application.cc
- components.json
- flutter_web pubspec.yaml
- home/page.dart
- route.gr.dart
- model.dart
- State
- components/page.dart
- app.dart
- app_bar.dart
- Portfolio Site — Visual Spec (from `nextjs/design/` SVG exports)
- utils.cpp
- StatelessWidget
- route.dart
- manifest.json
- package:flutter/material.dart
- text.dart
- app_state.dart
- localization.dart
- lib.dart
- components.dart
- AppLocalizations
- web.dart
- MainActivity.kt
- native.dart
- route.ts
- vm.dart
- app/page.tsx
- CONTEXT.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- Launch Screen Assets
- 0001-content-as-local-typed-data.md
- 0002-motion-for-animations.md

## God Nodes (most connected - your core abstractions)
1. `_` - 44 edges
2. `_` - 38 edges
3. `cn()` - 25 edges
4. `Win32Window` - 21 edges
5. `Portfolio Site — Visual Spec (from `nextjs/design/` SVG exports)` - 17 edges
6. `compilerOptions` - 16 edges
7. `flutter_web Project` - 12 edges
8. `flutter_web pubspec.yaml` - 9 edges
9. `plain_html About Page (index.html)` - 8 edges
10. `plain_html Contact Page` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Saiful Mashuri Portrait (me-maskable)` --conceptually_related_to--> `flutter_web Project`  [INFERRED]
  flutter_web/assets/images/me-maskable.png → AGENTS.md
- `ISC Workflow (Form Builder & Applications)` --conceptually_related_to--> `flutter_web Project`  [INFERRED]
  flutter_web/assets/portfolios/isc_workflow/isc-logo.png → AGENTS.md
- `MyKampus Radio (MKR) - Youth-focused Media Platform` --conceptually_related_to--> `flutter_web Project`  [INFERRED]
  flutter_web/assets/portfolios/my_kampus_radio/mkr-logo.png → AGENTS.md
- `Sansols (Sarawak Labour System)` --conceptually_related_to--> `flutter_web Project`  [INFERRED]
  flutter_web/assets/portfolios/sansols/sansols-logo.png → AGENTS.md
- `MKR Unofficial App (Flutter)` --semantically_similar_to--> `flutter_web Project`  [INFERRED] [semantically similar]
  README.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Saifymatteo Three-Project Monorepo** — agents_monorepo, agents_nextjs_project, agents_flutter_web_project, agents_plain_html_project [EXTRACTED 1.00]
- **flutter_web Desktop Build Configuration** — flutter_web_linux_cmakelists_runner_build, flutter_web_linux_flutter_cmakelists_flutter_library, flutter_web_windows_cmakelists_runner_build, flutter_web_windows_flutter_cmakelists_flutter_library, flutter_web_windows_runner_cmakelists_app, flutter_web_pubspec_pubspec [INFERRED 0.85]
- **plain_html Legacy Static Site (shared nav)** — plain_html_index_homepage, plain_html_html_contact_me_contactpage, plain_html_html_skills_skillspage, plain_html_html_portfolio_portfoliopage [INFERRED 0.85]
- **ISC Workflow Portfolio Media Set** — flutter_web_assets_portfolios_isc_workflow_isc_workflow_project, flutter_web_assets_portfolios_isc_workflow_isc_landing_isc_workflow_landing_screenshot, flutter_web_assets_portfolios_isc_workflow_isc_home_isc_workflow_home_screenshot, flutter_web_assets_portfolios_isc_workflow_isc_listing_isc_workflow_listing_screenshot, flutter_web_assets_portfolios_isc_workflow_isc_kgc_listing_isc_workflow_kgc_listing_screenshot, flutter_web_assets_portfolios_isc_workflow_isc_logo_isc_workflow_logo [EXTRACTED 1.00]
- **MyKampus Radio Portfolio Media Set** — flutter_web_assets_portfolios_my_kampus_radio_my_kampus_radio_project, flutter_web_assets_portfolios_my_kampus_radio_mkr_home_my_kampus_radio_home_screenshot, flutter_web_assets_portfolios_my_kampus_radio_mkr_side_panel_my_kampus_radio_side_panel_screenshot, flutter_web_assets_portfolios_my_kampus_radio_mkr_home_mobile_my_kampus_radio_mobile_home_screenshot, flutter_web_assets_portfolios_my_kampus_radio_mkr_side_panel_mobile_my_kampus_radio_mobile_side_panel_screenshot, flutter_web_assets_portfolios_my_kampus_radio_mkr_logo_my_kampus_radio_logo [EXTRACTED 1.00]
- **Sansols Portfolio Media Set** — flutter_web_assets_portfolios_sansols_sansols_project, flutter_web_assets_portfolios_sansols_sansols_landing_sansols_landing_screenshot, flutter_web_assets_portfolios_sansols_sansols_gov_home_page_sansols_government_home_page_screenshot, flutter_web_assets_portfolios_sansols_sansols_employer_ap_listing_sansols_employer_ap_listing_screenshot, flutter_web_assets_portfolios_sansols_sansols_employer_ap_details_sansols_employer_ap_details_screenshot, flutter_web_assets_portfolios_sansols_sansols_logo_sansols_logo [EXTRACTED 1.00]

## Communities (59 total, 11 thin omitted)

### Community 0 - "app_localizations.dart"
Cohesion: 0.03
Nodes (63): app_localizations_en.dart, class, dart:async, aboutMe, aboutMeDescription, contact, contactMe, contactMeDescription (+55 more)

### Community 1 - "win32_window.cpp"
Cohesion: 0.10
Nodes (32): RegisterPlugins(), FlutterWindow, flutter_controller_, MessageHandler, OnCreate, OnDestroy, project_, EnableFullDpiSupportIfAvailable() (+24 more)

### Community 2 - "app_localizations_en.dart"
Cohesion: 0.04
Nodes (51): aboutMe, aboutMeDescription, contact, contactMe, contactMeDescription, contributions, copyrightNotice, email (+43 more)

### Community 3 - "flutter_web Project"
Cohesion: 0.06
Nodes (48): Conventional Commits Convention, deploy.ps1 Deployment Script, flutter_web Project, Generated Files (do not edit), graphify Knowledge Graph, Saifymatteo Monorepo, nextjs Project, OpenSpec (+40 more)

### Community 4 - "menubar.tsx"
Cohesion: 0.08
Nodes (37): cookie, firaCode, firaSans, metadata, viewport, MotionProvider(), AppNavigationBar(), Button() (+29 more)

### Community 5 - "_"
Cohesion: 0.06
Nodes (36): _, animation, AppAssets, AssetGenImage, AssetGenImageAnimation, _assetName, duration, flavors (+28 more)

### Community 6 - "GeneratedPluginRegistrant.swift"
Cohesion: 0.09
Nodes (14): Cocoa, Flutter, AppDelegate, RunnerTests, RegisterGeneratedPlugins(), AppDelegate, MainFlutterWindow, RunnerTests (+6 more)

### Community 7 - "dependencies"
Cohesion: 0.06
Nodes (35): @base-ui/react, camera-controls, class-variance-authority, clsx, lucide-react, motion, next, dependencies (+27 more)

### Community 8 - "compilerOptions"
Cohesion: 0.06
Nodes (32): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+24 more)

### Community 9 - "constants.dart"
Cohesion: 0.07
Nodes (27): assets.gen.dart, C, emailAddress, harvardCs50xAddress, isMobile, kAppBarHeight, kAppBodyWidth, _Media (+19 more)

### Community 10 - "devDependencies"
Cohesion: 0.05
Nodes (38): babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-prettier, devDependencies, babel-plugin-react-compiler, eslint (+30 more)

### Community 11 - "_"
Cohesion: 0.09
Nodes (26): ../components/components.dart, _PortfolioIscWorkflow, _PortfolioMyKampusRadio, _PortfolioSansols, dart:ui, PortfolioModel, _, allMedia (+18 more)

### Community 12 - "my_application.cc"
Cohesion: 0.16
Nodes (8): fl_register_plugins(), main(), my_application_activate(), my_application_init(), my_application_new(), _MyApplication, dart_entrypoint_arguments, parent_instance

### Community 13 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 14 - "flutter_web pubspec.yaml"
Cohesion: 0.12
Nodes (19): Prefer Relative Imports Convention, flutter_web Analysis Options, flutter_lints, Flutter l10n Configuration, Linux Runner CMake Build, Linux Flutter Library CMake, auto_route, build_runner (+11 more)

### Community 15 - "home/page.dart"
Cohesion: 0.07
Nodes (28): description, image, label, _onHoverHarvardCs50x, onTap, onTapCard, onTapSeeWhatIDo, title (+20 more)

### Community 16 - "route.gr.dart"
Cohesion: 0.20
Nodes (10): hashCode, HomePageRoute, key, name, operator, page, pathTitle, PortfolioPageRoute (+2 more)

### Community 17 - "model.dart"
Cohesion: 0.12
Nodes (15): description, highlights, icon, image, label, link, links, media (+7 more)

### Community 18 - "State"
Cohesion: 0.16
Nodes (18): _AboutSection, _AboutSectionState, _Button, _ButtonState, _ContactSection, _ContactSectionState, _MeSection, _MeSectionState (+10 more)

### Community 19 - "components/page.dart"
Cohesion: 0.17
Nodes (12): BoxDecoration?, EdgeInsets?, AppState, BasePage, build, child, children, decoration (+4 more)

### Community 20 - "app.dart"
Cohesion: 0.17
Nodes (12): build, buildOverscrollIndicator, createState, _CustomScrollBehavior, _DeferredLoadingPlaceholder, getScrollPhysics, MyApp, _MyAppState (+4 more)

### Community 21 - "app_bar.dart"
Cohesion: 0.17
Nodes (12): _ActionButton, _ActionButtonState, build, createState, _isHover, labelText, MenuAppBar, onPressed (+4 more)

### Community 22 - "Portfolio Site — Visual Spec (from `nextjs/design/` SVG exports)"
Cohesion: 0.09
Nodes (22): 0. Global design tokens, 10. Page: Projects (`pages/Projects - Light.svg`, `pages/Projects - Dark.svg`), 11. Page: Work / Case Study (`pages/Work - Light.svg` — no dark variant), 12. Page: Contact (`pages/Contact - Light.svg` — no dark variant), 13. Light ↔ dark swap table (exact), 14. Responsive behavior (from layout), 15. Caveats / corrections vs earlier PNG spec, 1. MenuBar (`components/light|MenuBar.svg`, `components/dark|MenuBar.svg`) (+14 more)

### Community 23 - "utils.cpp"
Cohesion: 0.43
Nodes (4): wWinMain(), CreateAndAttachConsole(), GetCommandLineArguments(), Utf8FromUtf16()

### Community 24 - "StatelessWidget"
Cohesion: 0.20
Nodes (11): @RoutePage, _Base, WebBodyBase, HomePage, _HeaderSection, _LinksSection, _MediaSections, _MediaSectionsItem (+3 more)

### Community 25 - "route.dart"
Cohesion: 0.17
Nodes (10): @AutoRouterConfig, AppRouter, defaultRouteType, routes, List, package:auto_route/auto_route.dart, RootStackRouter, route.dart (+2 more)

### Community 26 - "manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, prefer_related_applications, short_name (+2 more)

### Community 27 - "package:flutter/material.dart"
Cohesion: 0.15
Nodes (10): app.dart, components.dart, main, build, Footer, main, main, ../../../lib.dart (+2 more)

### Community 28 - "text.dart"
Cohesion: 0.29
Nodes (6): Color, BodyText, build, color, text, TitleText

### Community 29 - "app_state.dart"
Cohesion: 0.40
Nodes (4): HomeSections, _scrollContext, updateScrollContext, Map

### Community 30 - "localization.dart"
Cohesion: 0.33
Nodes (5): app_localizations.dart, AppLocalizations get, BuildContext, appL10n, AppLocalizationsContext

### Community 31 - "lib.dart"
Cohesion: 0.33
Nodes (5): app_state.dart, constants/constants.dart, localization/localization.dart, routes/routes.dart, vm/vm.dart

### Community 32 - "components.dart"
Cohesion: 0.40
Nodes (4): app_bar.dart, footer.dart, page.dart, text.dart

### Community 33 - "AppLocalizations"
Cohesion: 0.50
Nodes (5): AppLocalizations, _AppLocalizationsDelegate, AppLocalizationsEn, of, LocalizationsDelegate

### Community 34 - "web.dart"
Cohesion: 0.40
Nodes (4): reloadPage, usePathUrlStrategy, package:flutter_web_plugins/url_strategy.dart, package:web/web.dart

### Community 46 - "app/page.tsx"
Cohesion: 0.07
Nodes (30): AppConstants, contacts, metadata, AppProjectsPage(), metadata, AppIndividualProjectPage(), generateMetadata(), Props (+22 more)

## Knowledge Gaps
- **434 isolated node(s):** `_router`, `createState`, `build`, `buildOverscrollIndicator`, `getScrollPhysics` (+429 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `_` connect `_` to `route.dart`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `_` connect `_` to `constants.dart`, `model.dart`, `State`, `StatelessWidget`, `route.dart`, `package:flutter/material.dart`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `_router`, `createState`, `build` to the rest of the system?**
  _434 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app_localizations.dart` be split into smaller, more focused modules?**
  _Cohesion score 0.03125 - nodes in this community are weakly interconnected._
- **Should `win32_window.cpp` be split into smaller, more focused modules?**
  _Cohesion score 0.09639953542392567 - nodes in this community are weakly interconnected._
- **Should `app_localizations_en.dart` be split into smaller, more focused modules?**
  _Cohesion score 0.038461538461538464 - nodes in this community are weakly interconnected._