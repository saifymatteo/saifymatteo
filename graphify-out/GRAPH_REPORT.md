# Graph Report - saifymatteo  (2026-08-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 737 nodes · 940 edges · 69 communities (50 shown, 19 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b4f642f2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Flutter Localization Strings
- home/page.dart
- TechStack Section (dark)
- Next.js Dev Tooling
- devDependencies
- dependencies
- compilerOptions
- constants.dart
- _
- AGENTS.md
- components.json
- app/layout.tsx
- contact/page.tsx
- Flutter Home Sections
- app/page.tsx
- Flutter App + Provider
- Flutter App Bar (Menubar)
- Auto-route Routing
- projects/page.tsx
- projects.ts
- route.dart
- StatelessWidget
- package:flutter/material.dart
- case_study.tsx
- Projects Page Design Screenshot (Light)
- Dark Theme Design System
- case_study_preview.tsx
- ../../../lib.dart
- SM Brand Logo (circle, base resolution)
- text.dart
- localization.dart
- lib.dart
- Sansols (Sarawakian & Non Sarawakian Online Labour System)
- contact_form.tsx
- components.dart
- iSarawakCare / SarawakCare Hornbill Logo
- web.dart
- PortfolioModel
- Personal avatar photo (maskable, base resolution)
- AppLocalizations
- Contact (plain_html)
- MyKampus Radio
- MyKampus Radio Home Screenshot (tablet/desktop)
- native.dart
- send/route.ts
- vm.dart
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- Site Logo (Dark Mode)
- SM Favicon Logo 192x192
- iSarawakCare KGC Listing Screenshot
- iSarawakCare Sign-in (Landing) Screenshot
- iSarawakCare Published Initiatives Listing Screenshot
- MyKampus Radio Home (Mobile) Screenshot
- MyKampus Radio Side Panel (Mobile) Screenshot
- MyKampus Radio Side Panel (Desktop) Screenshot
- Sansols Employer AP Details Screenshot
- Sansols Employer AP Listing Screenshot
- Sansols Landing Page Screenshot
- nextjs README
- Portfolio design system (shared tokens)

## God Nodes (most connected - your core abstractions)
1. `_` - 42 edges
2. `cn()` - 25 edges
3. `compilerOptions` - 16 edges
4. `TechStack Section (dark)` - 12 edges
5. `include` - 7 edges
6. `Project` - 6 edges
7. `PageHero()` - 6 edges
8. `GradientBar()` - 6 edges
9. `aliases` - 6 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `flutter_web pubspec.yaml` --conceptually_related_to--> `SANSOLS`  [INFERRED]
  flutter_web/pubspec.yaml → nextjs/design/SPEC.md
- `Domain Docs` --references--> `ADR-0001 Content as Local Typed Data`  [INFERRED]
  docs/agents/domain.md → nextjs/docs/adr/0001-content-as-local-typed-data.md
- `Domain Docs` --references--> `ADR-0002 Motion for Animations`  [INFERRED]
  docs/agents/domain.md → nextjs/docs/adr/0002-motion-for-animations.md
- `_` --references--> `PortfolioLabelAndLink`  [EXTRACTED]
  flutter_web/lib/pages/portfolio/page.dart → flutter_web/lib/pages/portfolio/model.dart
- `_` --references--> `PortfolioMedia`  [EXTRACTED]
  flutter_web/lib/pages/portfolio/page.dart → flutter_web/lib/pages/portfolio/model.dart

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Legacy plain_html static site** — plain_html_index_index, plain_html_html_contact_me_contact_me, plain_html_html_portfolio_portfolio, plain_html_html_skills_skills [EXTRACTED 0.95]
- **Three Portfolio Projects** — nextjs_design_spec_sansols, nextjs_design_spec_isc_workflow, nextjs_design_spec_mykampus_radio [EXTRACTED 0.95]
- **Personal avatar asset set (multi-density variants)** — flutter_web_assets_images_me_maskable, flutter_web_assets_images_2_0x_me_maskable, flutter_web_assets_images_3_0x_me_maskable, flutter_web_assets_images_4_0x_me_maskable [EXTRACTED 0.98]
- **SM brand logo asset set (multi-density variants)** — flutter_web_assets_icons_logo_circle, flutter_web_assets_icons_logo_rectangle, flutter_web_assets_icons_2_0x_logo_circle, flutter_web_assets_icons_2_0x_logo_rectangle, flutter_web_assets_icons_3_0x_logo_circle, flutter_web_assets_icons_3_0x_logo_rectangle, flutter_web_assets_icons_4_0x_logo_circle, flutter_web_assets_icons_4_0x_logo_rectangle [EXTRACTED 0.98]
- **Dark theme component variants** — nextjs_design_components_dark_ProjectWide, nextjs_design_components_dark_TechStack_Section, dark_theme [EXTRACTED 1.00]
- **Tech stack listed in TechStack Section** — flutter_tech, dart_tech, react_tech, typescript, nextjs_tech, vite_tech, docker_tech, cicd_tech, playwright_tech, figma_tech, affinity_tech, nextjs_design_components_light_TechStack_Section [EXTRACTED 1.00]
- **Tech Stack items displayed together** — flutter_tech, dart_tech, react_tech, typescript, nextjs_tech, vite_tech, docker_tech, cicd_tech, playwright_tech, figma_tech, affinity_tech [EXTRACTED 1.00]
- **Home page theme variants** — nextjs_design_pages_Home_Dark, nextjs_design_pages_Home_Light [INFERRED 0.80]
- **Light theme portfolio page composition** — nextjs_design_components_light_Header_Section, nextjs_design_components_light_MenuBar, nextjs_design_components_light_Project_Section, nextjs_design_components_light_Contact_Section, nextjs_design_components_light_Footer [INFERRED 0.80]
- **Portfolio design system (shared tokens)** — nextjs_design_components_light_ProjectNarrow, nextjs_design_components_light_ProjectWide, nextjs_design_components_light_TechStack_Section, nextjs_design_pages_Home_Dark, nextjs_design_pages_Home_Light, nextjs_design_pages_Projects_Dark, nextjs_design_pages_Contact_Light, fira_code_font, fira_sans_font, primary_blue_color, portfolio_design_system [INFERRED 0.85]
- **SM Brand Favicon Set** — nextjs_public_favicon_favicon-192x192_png, nextjs_public_favicon_favicon-512x512_png [INFERRED 0.90]
- **iSarawakCare workflow portfolio screenshots** — flutter_web_assets_portfolios_isc_workflow_isc_home, flutter_web_assets_portfolios_isc_workflow_isc_kgc_listing, flutter_web_assets_portfolios_isc_workflow_isc_landing, flutter_web_assets_portfolios_isc_workflow_isc_listing, flutter_web_assets_portfolios_isc_workflow_isc_logo [INFERRED 0.95]

## Communities (69 total, 19 thin omitted)

### Community 0 - "Flutter Localization Strings"
Cohesion: 0.03
Nodes (66): app_localizations_en.dart, class, dart:async, aboutMe, aboutMeDescription, contact, contactMe, contactMeDescription (+58 more)

### Community 1 - "home/page.dart"
Cohesion: 0.06
Nodes (42): _AboutSection, _AboutSectionState, _Button, _ButtonState, _ContactSection, _ContactSectionState, description, image (+34 more)

### Community 2 - "TechStack Section (dark)"
Cohesion: 0.09
Nodes (34): Accent color #0494df (blue), Affinity, CI/CD, Get in touch (CTA), Contact (navigation), Dark theme variant, Dart, Docker (+26 more)

### Community 3 - "Next.js Dev Tooling"
Cohesion: 0.11
Nodes (30): Button(), buttonVariants, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel() (+22 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (37): babel-plugin-react-compiler, eslint, eslint-config-next, eslint-config-prettier, eslint-plugin-prettier, devDependencies, babel-plugin-react-compiler, eslint (+29 more)

### Community 5 - "dependencies"
Cohesion: 0.05
Nodes (37): @base-ui/react, camera-controls, class-variance-authority, clsx, lucide-react, motion, next, dependencies (+29 more)

### Community 6 - "compilerOptions"
Cohesion: 0.06
Nodes (32): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+24 more)

### Community 7 - "constants.dart"
Cohesion: 0.07
Nodes (27): assets.gen.dart, C, emailAddress, harvardCs50xAddress, isMobile, kAppBarHeight, kAppBodyWidth, _Media (+19 more)

### Community 8 - "_"
Cohesion: 0.08
Nodes (26): ../components/components.dart, dart:ui, _, allMedia, build, createState, _currentMedia, iscWorkflow (+18 more)

### Community 9 - "AGENTS.md"
Cohesion: 0.10
Nodes (20): Domain Docs, Issue Tracker (GitHub), Triage Labels, flutter_web analysis_options.yaml, flutter_web l10n.yaml, flutter_web pubspec.yaml, flutter_web README, Case Study (+12 more)

### Community 10 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 11 - "app/layout.tsx"
Cohesion: 0.12
Nodes (13): dynamic, BrandLogo(), elsewhere, Footer(), links, MotionProvider(), AppNavigationBar(), AppConstants (+5 more)

### Community 12 - "contact/page.tsx"
Cohesion: 0.13
Nodes (11): TechStack(), ResumeCardProps, ResumeDialog(), ResumeViewer, ContactLinkType, default, viewer, contacts (+3 more)

### Community 13 - "Flutter Home Sections"
Cohesion: 0.12
Nodes (15): description, highlights, icon, image, label, link, links, media (+7 more)

### Community 14 - "app/page.tsx"
Cohesion: 0.23
Nodes (5): fadeUp, HomeHero(), PageHero(), Pill(), ShaderBackdrop()

### Community 15 - "Flutter App + Provider"
Cohesion: 0.17
Nodes (12): BoxDecoration?, EdgeInsets?, AppState, BasePage, build, child, children, decoration (+4 more)

### Community 16 - "Flutter App Bar (Menubar)"
Cohesion: 0.17
Nodes (12): build, buildOverscrollIndicator, createState, _CustomScrollBehavior, _DeferredLoadingPlaceholder, getScrollPhysics, MyApp, _MyAppState (+4 more)

### Community 17 - "Auto-route Routing"
Cohesion: 0.17
Nodes (12): _ActionButton, _ActionButtonState, build, createState, _isHover, labelText, MenuAppBar, onPressed (+4 more)

### Community 18 - "projects/page.tsx"
Cohesion: 0.19
Nodes (5): ProjectCard(), AppProjectsPage(), metadata, Reveal(), projectStats()

### Community 19 - "projects.ts"
Cohesion: 0.24
Nodes (7): projectIscWorkflow, projectMyKampusRadio, CaseStudySection, Project, projects, ProjectStatus, projectSansols

### Community 20 - "route.dart"
Cohesion: 0.17
Nodes (10): @AutoRouterConfig, AppRouter, defaultRouteType, routes, List, package:auto_route/auto_route.dart, RootStackRouter, route.dart (+2 more)

### Community 21 - "StatelessWidget"
Cohesion: 0.20
Nodes (11): @RoutePage, _Base, WebBodyBase, HomePage, _HeaderSection, _LinksSection, _MediaSections, _MediaSectionsItem (+3 more)

### Community 22 - "package:flutter/material.dart"
Cohesion: 0.18
Nodes (8): HomeSections, _scrollContext, updateScrollContext, main, main, Map, package:flutter/material.dart, package:flutter_test/flutter_test.dart

### Community 23 - "case_study.tsx"
Cohesion: 0.27
Nodes (7): CaseStudyBody(), CaseStudyHero(), AppIndividualProjectPage(), generateMetadata(), Props, getAdjacentProjects(), getProject()

### Community 24 - "Projects Page Design Screenshot (Light)"
Cohesion: 0.18
Nodes (11): Projects Page Design Screenshot (Light), Work Page Design Screenshot (Light), iSarawakCare Dashboard Screenshot, iSarawakCare Logo (Light), iSarawakCare Logo (Dark), MyKampus Radio Home (Desktop) Screenshot, MyKampus Radio Logo, Sansols Government Home Dashboard Screenshot (+3 more)

### Community 25 - "Dark Theme Design System"
Cohesion: 0.31
Nodes (10): Dark Theme Design System, Saiful Mashuri Personal Portfolio, Next.js Apple Touch Icon (SM monogram), Next.js Favicon (SM monogram), Contact Section Design, Footer Design, Header Section Design, MenuBar Design (+2 more)

### Community 26 - "case_study_preview.tsx"
Cohesion: 0.33
Nodes (6): PreviewSection(), PreviewSectionProps, ImageViewer(), ImageViewerMedia, ImageViewerProps, Marquee()

### Community 27 - "../../../lib.dart"
Cohesion: 0.25
Nodes (6): app.dart, components.dart, main, build, Footer, ../../../lib.dart

### Community 28 - "SM Brand Logo (circle, base resolution)"
Cohesion: 0.25
Nodes (8): SM Brand Logo (circle, 2.0x density), SM Brand Logo (rectangle, 2.0x density), SM Brand Logo (circle, 3.0x density), SM Brand Logo (rectangle, 3.0x density), SM Brand Logo (circle, 4.0x density), SM Brand Logo (rectangle, 4.0x density), SM Brand Logo (circle, base resolution), SM Brand Logo (rectangle, base resolution)

### Community 29 - "text.dart"
Cohesion: 0.29
Nodes (6): Color, BodyText, build, color, text, TitleText

### Community 30 - "localization.dart"
Cohesion: 0.33
Nodes (5): app_localizations.dart, AppLocalizations get, BuildContext, appL10n, AppLocalizationsContext

### Community 31 - "lib.dart"
Cohesion: 0.33
Nodes (5): app_state.dart, constants/constants.dart, localization/localization.dart, routes/routes.dart, vm/vm.dart

### Community 32 - "Sansols (Sarawakian & Non Sarawakian Online Labour System)"
Cohesion: 0.73
Nodes (6): Sansols (Sarawakian & Non Sarawakian Online Labour System), Sansols Employer AP Details, Sansols Employer AP Listing, Sansols Government Dashboard, Sansols Landing Page, Sansols Logo

### Community 33 - "contact_form.tsx"
Cohesion: 0.47
Nodes (3): ContactForm(), Status, buttonVariants

### Community 34 - "components.dart"
Cohesion: 0.40
Nodes (4): app_bar.dart, footer.dart, page.dart, text.dart

### Community 35 - "iSarawakCare / SarawakCare Hornbill Logo"
Cohesion: 0.40
Nodes (5): iSarawakCare Dashboard Screenshot, iSarawakCare KGC Listing Screenshot, iSarawakCare Sign-in Landing Screenshot, iSarawakCare Published Initiatives Listing Screenshot, iSarawakCare / SarawakCare Hornbill Logo

### Community 36 - "web.dart"
Cohesion: 0.40
Nodes (4): reloadPage, usePathUrlStrategy, package:flutter_web_plugins/url_strategy.dart, package:web/web.dart

### Community 37 - "PortfolioModel"
Cohesion: 0.50
Nodes (4): _PortfolioIscWorkflow, _PortfolioMyKampusRadio, _PortfolioSansols, PortfolioModel

### Community 38 - "Personal avatar photo (maskable, base resolution)"
Cohesion: 0.50
Nodes (4): Personal avatar photo (maskable, 2.0x density), Personal avatar photo (maskable, 3.0x density), Personal avatar photo (maskable, 4.0x density), Personal avatar photo (maskable, base resolution)

### Community 40 - "AppLocalizations"
Cohesion: 0.50
Nodes (4): AppLocalizations, _AppLocalizationsDelegate, of, LocalizationsDelegate

### Community 41 - "Contact (plain_html)"
Cohesion: 1.00
Nodes (4): Contact (plain_html), Portfolio (plain_html), Skills (plain_html), About (plain_html index)

### Community 43 - "MyKampus Radio"
Cohesion: 1.00
Nodes (3): MyKampus Radio, MKR Side Panel (Desktop), MKR Side Panel (Mobile)

### Community 44 - "MyKampus Radio Home Screenshot (tablet/desktop)"
Cohesion: 1.00
Nodes (3): MyKampus Radio Home Screenshot (tablet/desktop), MyKampus Radio Home Screenshot (mobile), MyKampus Radio (MKR) Logo

## Ambiguous Edges - Review These
- `Accent color #0494df (blue)` → `NextJS`  [AMBIGUOUS]
  nextjs/design/components/light/Header Section.svg · relation: conceptually_related_to

## Knowledge Gaps
- **315 isolated node(s):** `Status`, `ResumeCardProps`, `CaseStudySection`, `ProjectStatus`, `Props` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Accent color #0494df (blue)` and `NextJS`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `_` connect `_` to `PortfolioModel`, `constants.dart`, `Flutter Home Sections`, `route.dart`, `StatelessWidget`, `package:flutter/material.dart`, `../../../lib.dart`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `Status`, `ResumeCardProps`, `CaseStudySection` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Flutter Localization Strings` be split into smaller, more focused modules?**
  _Cohesion score 0.029850746268656716 - nodes in this community are weakly interconnected._
- **Should `home/page.dart` be split into smaller, more focused modules?**
  _Cohesion score 0.06423034330011074 - nodes in this community are weakly interconnected._
- **Should `TechStack Section (dark)` be split into smaller, more focused modules?**
  _Cohesion score 0.08636977058029689 - nodes in this community are weakly interconnected._