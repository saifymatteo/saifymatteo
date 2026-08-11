# Portfolio Site — Visual Spec (from `nextjs/design/` SVG exports)

> Extracted directly from the 22 Figma SVG exports (6 page files + 16 component files, `light/` + `dark/`). Values below are **exact** — text strings, font-family/weight/size, fill colors, and x/y coordinates read from the SVG XML. All coordinates are from each file's own `viewBox` (1920-wide artboards).

---

## 0. Global design tokens

### Brand gradient

- **Every colored surface** (hero backgrounds, project section background, contact card, footer accent bar, tech-stack rules, page dividers) uses the **same linear gradient**:
  - `#0494df` (blue) → `#8dd9ff` (light blue), both stops at opacity 1.
- This is the entire color system — there are **no violet/cyan/fuchsia variants**. The dark theme reuses the identical gradient.

### Palette (exact from SVG)


| Token                                                  | Light                                         | Dark                         |
| -------------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
| Primary text                                           | `#1a1a1a` (rgb 26,26,26)                      | `#ffffff`                    |
| Muted text (status: COMPLETED/ONGOING)                 | `#2e2e2e` (rgb 46,46,46), weight 300          | `#ffffff`, weight 300        |
| Brand blue (accents: pills, tech tags, links, buttons) | `#0494df`                                     | `#ffffff` (inverts to white) |
| Tech-stack text                                        | `#1a1a1a` (component) / `#000000` (home page) | `#ffffff`                    |
| Form placeholder                                       | `#696969` (rgb 105,105,105)                   | —                           |

### Typography (exact from SVG `font-family`)

- **Fira Sans** — everything except the two script accents. Weights used: 300, 400, 500, 600, 700. (Nav links are Fira Sans w500 — **not serif**.)
- **Fira Code** — mono accents: the "Software Engineer" role pill (w600, 20px).
- **Cookie** — script accents: hero backdrop "Hla" (w400, **350px**) and "I'm" (w400, **60px**).
- Form mock uses Source Sans Pro; we keep Fira Sans per the project's font decision.

### Sizes (exact)

- H1 / page titles: **50px w700** (Projects, SANSOLS, Let's Talk, Interested?)
- Name block: **80px w700** ("SAIFUL", "MASHURI")
- Card titles: **26px w700**
- Card meta: pill 12px w700 · date 16px w700 · status 16px w300
- Tech tags: **10px w300**
- Card body / hero sub: **16px w400**
- Tagline: **20px w400** · nav links: **20px w500** · section heading: **30px w700** · case-study section number: 10px w300
- Footer: name 24px w700 · handle 24px (bold S/M + regular rest) · headers LINKS/ELSEWHERE 14px w300 uppercase · links 16px w400 · copyright 16px w400

### Decorative elements

- **10px-tall brand-gradient divider bars** appear above the footer and at section boundaries (footer top bar, page dividers).
- **Dashed column rails** + **noise/grain** were artifacts of the earlier PNG rendering, **not present in the SVG source** — the SVGs contain only the gradient surfaces. Treat grain/rails as optional embellishments, not design requirements.

---

## 1. MenuBar (`components/light|MenuBar.svg`, `components/dark|MenuBar.svg`)

viewBox `-27 -27 1974 146` → inner strip 1920×92.

- Left: **logo** (light 90.6×64, dark 77×48).
- Right: **"Projects"** x=1123, **"Contact"** x=1277 — Fira Sans w500 20px; light `#000000`, dark `#ffffff`.
- Center-right gap between the two links ≈ 154px.
- Theme toggle icon sits far right (not text-extracted; icon asset).
- No visible border.

## 2. Header Section / Hero (`components/light|Header Section.svg`, `components/dark|Header Section.svg`)

viewBox 0 0 1920 718. Full-bleed brand-gradient background (1920×718).

- **"Hla"** — Cookie 350px w400 white, x=411 y=484 (large script, left side, behind the portrait).
- **Portrait panel** — 707×619, right of the script (x 411+…), containing the cutout photo.
- Right text block (x≈1090–1240):
  - **"I'm"** — Cookie 60px white, x=1224 y=380
  - **"SAIFUL"** x=1132.9 y=466 / **"MASHURI"** x=1090 y=538 — Fira Sans 80px w700 white
  - **"I build software that matters with"** x=1106 y=574 / **"highest standard"** x=1180.9 y=598 — 20px w400 white
- **Role pill** — **"Software Engineer"** Fira Code w600 20px, x=1260 y=64 (top-right of hero): light = `#0494df` text (outlined-pill treatment, a second `fill=none` copy renders the border), dark = white text.

## 3. TechStack Section (`components/light|TechStack Section.svg`, `components/dark|TechStack Section.svg`)

viewBox 0 0 1920 110.

- Single row of **11 items**, Fira Sans **30px w500**, evenly distributed x=305 → 1517 (gaps ~90–190px):
  `Flutter · Dart · React · Typescript · NextJS · Vite · Docker · CI/CD · Playwright · Figma · Affinity`
- **Top + bottom 1px-equivalent rules: two 1920×5 brand-gradient bars.**
- Light: text `#1a1a1a`; dark: text `#ffffff`. Background is the page background (white / dark), **not black**.

## 4. Project Section (`components/light|Project Section.svg`, `components/dark|Project Section.svg`)

viewBox 0 0 1921 1029. Full-bleed brand-gradient background.

- Header row: **"Projects"** 50px w700 white, x=450 y=120 (left); **"Featured Works"** pill 20px w600, x=1296 y=103 — light `#0494df`, dark white.
- **Card 1 — SANSOLS (wide, two-column)**: meta "Web & Mobile" (typo "Mobilte" appears in the standalone section, corrected on the Home page mock) · 2022-2025 · COMPLETED. Title "SANSOLS - Sarawak & Non-Sarawakian Labour System" 26px w700. Body 16px w400 (2 lines). **10 tech tags**: Flutter Dart Provider RxDart Freezed OneSignal Sentry Geolocator CI/CD Playwright. "Case Study" 16px w700 link.
- **Card 2 — iSC Workflow (narrow)**: meta "Web" · 2020-Present · ONGOING. Title "iSC Workflow". Body "Web form builder owned by Sarawak state, designed to reduce constraints between state's initiatives and applicants". **6 tech tags**: Flutter Dart Provider Freezed CI/CD Playwright. "Case Study" link.
- **Card 3 — MyKampus Radio Unofficial App (narrow)**: meta "Web & Mobile" · 2021 · COMPLETED. Title "MyKampus Radio Unofficial App". Body "Personal work designed to provide better accessibility on livestream for MyKampus Radio listeners". **3 tech tags**: Flutter Dart Provider. "Case Study" link.
- Accent colors: light = `#0494df` for pill text/tags/links; dark = `#ffffff` for all three.
- **"View All Projects"** 20px w500, x=872.5 y=960 (centered, below cards) — light `#0494df`, dark white.
- Card surfaces: white (light) / near-black (dark); card rects ≈ 356×185 (tag row) with logo panels 465×183 / 338×204 / 356×185 (narrow-card logos).

## 5. ProjectWide (`components/light|ProjectWide.svg`, `components/dark|ProjectWide.svg`)

viewBox `-48 -48 1219 383` → card ≈ 1123×287.

- Two columns: **logo panel left (~30%)** + content right (x≈415+).
- Content identical to §4 Card 1 (meta row at y≈49–51, title y≈103, body y≈142/161, tags y≈193, "Case Study" y≈232).
- Same light/dark inversion.

## 6. ProjectNarrow (`components/light|ProjectNarrow.svg`, `components/dark|ProjectNarrow.svg`)

viewBox `-48 -48 650 519` → card ≈ 554×423.

- Vertical stack (iSC Workflow): logo row (y≈130), meta row (Web pill + 2020-Present + ONGOING, y≈187–189), title y≈239, body y≈278/297, 6 tags y≈329, "Case Study" y≈368.
- Same light/dark inversion.

## 7. Contact Section (`components/light|Contact Section.svg`, `components/dark|Contact Section.svg`)

viewBox 0 0 1920 414.

- **10px brand-gradient divider bar** at top (1920×10).
- Centered **card 768×284, rx=20**, brand-gradient fill:
  - **"Interested?"** 50px w700 white, x=831 y=160
  - **"I'm excited to start a new project with you! For business inquiries, please contact me."** 16px w400 white, x=653 y=225
  - **"Get in touch"** pill 20px w500 white, x=892.5 y=305
- Identical in light and dark (gradient card, white text).

## 8. Footer (`components/light|Footer.svg`, `components/dark|Footer.svg`)

viewBox 0 0 1920 252.

- **Top accent bar: 1920×10 brand-gradient.**
- **Col 1 (brand, left ~x430–780)**: logo tile (light 123×87, dark 103×64) · **"Saiful Mashuri"** 24px w700 · handle **"saifymatteo"** 24px (bold "s", regular "aify", bold "m", regular "atteo") · tagline "Making software that matters with highest standards" 14px w400.
- **Col 2 — LINKS** (x≈1134): header 14px w300 uppercase; **Projects** x=1117 y=91, **Contact** x=1120 y=124 — 16px w400.
- **Col 3 — ELSEWHERE** (x≈1316–1426, 2×2): header; Github x=1330 y=91 · Email x=1426 y=91 · LinkedIn x=1316 y=124 · **Résumé** x=1409 y=124 — 16px w400.
- Copyright row: **"© 2026 Saiful Mashuri"** x=430 y=230 (left) · **"Design with Figma and built with NextJS"** x=1183 y=230 (right) — 16px w400.
- Light text `#1a1a1a`; dark text `#ffffff`.

## 9. Page: Home (`pages/Home - Light.svg`, `pages/Home - Dark.svg`)

viewBox 0 0 1920 2603. Composition (top → bottom):

**MenuBar (92) → Hero (718) → TechStack (110) → Project Section (1029) → Contact Section (414) → Footer (252)**, plus 10px gradient divider bars at the footer.

- Hero + Projects read as one continuous brand-gradient band split by the TechStack strip.
- Contact card + footer sit on the page background (white / dark).
- Layout proportions per component specs §1–§8 above.

## 10. Page: Projects (`pages/Projects - Light.svg`, `pages/Projects - Dark.svg`)

viewBox 0 0 1920 1757.

- **MenuBar** → **Hero 1921×386 brand-gradient**:
  - **"All Projects I've Worked"** 50px w700 white, x=446 y=240
  - "These are the projects that I can talk about, what were the problems, the trade-offs and the result" 20px w400 white, x=446 y=284
  - **Stats row** (x=466 / 696 / 926): `PROJECTS 3` · `COMPLETED 2` · `ONGOING 1` — label 14px w400 white (y=351), value 24px w700 white (y=384).
- **3 stacked project cards** (all SANSOLS-shaped in the mock — real data renders 3 distinct projects), centered content column x≈827–1405, each with meta row / title / body / 10 tags / Case Study link.
- **Footer** with a 10px gradient divider above (two 1920×10 bars bound the card stack region).
- Light: card text `#1a1a1a`, accents `#0494df`; dark: text + accents `#ffffff`.

## 11. Page: Work / Case Study (`pages/Work - Light.svg` — no dark variant)

viewBox 0 0 1920 2497. Template for `/projects/[slug]`.

- **Hero 1920×514 brand-gradient**: logo (left) · **"SANSOLS"** 50px w700 white x=846 y=240 · subtitle "Sarawak & Non-Sarawakian Labour System" 26px w700 x=846 y=276 · description 16px w400 x=846 y=315/334 · ghost buttons **"Website"** x=909.5 y=391.5 and **"Press"** x=1155.5 y=391.5 (16px w500 white outline).
- **4 info cards** (x=467 / 703 / 939 / 1175, y≈470–513): label 14px w400 white, value 16px w700 white —
  `ROLE Front-end engineer` · `YEAR 2022-2024` · `STATUS ARCHIVED` · `STACK Flutter, NodeJS, GraphQL`.
- **Body — 7 numbered sections**, content column x=460, each: number "0X" 10px w300 + title 30px w700 (`#1a1a1a`), body 16px w400 `#1a1a1a`:
  1. **01 Problem** — "Employer and Sarawak government spend from 6-9 months in order to apply and approve in bringing in Foreign Workers to the State. SANSOLS project aim to cut the time needed to 1-2 weeks instead."
  2. **02 Preview** — (screenshot area; not text-extracted)
  3. **03 My Contributions** — 6 bullets: "Maintains the GraphQL API clients that has flexible queries and ORM-like pattern. Powered with recursion on fragments for reducing payload amount" · "Maintains the CI/CD for development, staging and live builds" · "Responsible for the entirety of the project quality" · "Delegate code ownership to team members" · "Google Map integration with Map Marker and Search function" · "Reactive state management with Provider and RxDart"
  4. **04 Key Decisions** — "Lorem" (placeholder)
  5. **05 Trade-offs** — 2 bullets: "This was front-end role only, we have to built the app in Flutter against the API and data model provided by the back-end team" · "Introduction of GraphQL bringing flexibility to our API usage, but at the cost of bigger payload due to our team inexperienced in optimising it."
  6. **06 Result** — "The project managed to onboard 10 pilot major companies in Sarawak and ultimately was canceled for another vendor"
  7. **07 What Can Be Improve** — 2 bullets: "Consistent UI behaviors. Some area of UI are not polished due to time constraint" · "Multiple code redundancies requires factoring"
- **Author block** (name/handle/tagline, x≈430–780) then **Footer** with gradient divider.

## 12. Page: Contact (`pages/Contact - Light.svg` — no dark variant)

viewBox 0 0 1920 2497.

- **Hero 1921×466 brand-gradient**:
  - **"Let's Talk"** 50px w700 white
  - "Hit me up, I'm open to any roles and projects" 20px w400 white
  - **2×2 contact pills** (label 16px w700 white + value 26px w700 white):
    - Email — `hello@saifulmashuri.com`
    - Resume — `View & Download`
    - LinkedIn — `linkedin.com/in/saifymatteo`
    - Github — `github.com/saifymatteo`
- **Form section** — "**Or reach me directly**" 30px w700 `#1a1a1a`; fields 14px w400 with labels `#000000` and placeholders `#696969`:
  - Name (`John Doe`) + Email (`john.doe@example.com`) side by side
  - Subject (`Opportunities`) full width
  - Message (`Let's create something together`) full width, tall
  - **Submit** 20px w500 white button (brand-blue/sky pill per mock)
- **Footer** with gradient divider.

---

## 13. Light ↔ dark swap table (exact)


| Element                                                                      | Light                | Dark           |
| ------------------------------------------------------------------------------ | ---------------------- | ---------------- |
| Page / card background                                                       | white`#ffffff`       | near-black     |
| Primary text                                                                 | `#1a1a1a`            | `#ffffff`      |
| Muted (status)                                                               | `#2e2e2e` w300       | `#ffffff` w300 |
| Brand accents (pills, tags, links, View All, Featured Works, role pill text) | `#0494df`            | `#ffffff`      |
| Gradients (hero, sections, contact card, divider bars)                       | `#0494df → #8dd9ff` | identical      |
| Nav links                                                                    | `#000000`            | `#ffffff`      |
| Tech-stack text                                                              | `#1a1a1a`            | `#ffffff`      |
| Footer text                                                                  | `#1a1a1a`            | `#ffffff`      |

## 14. Responsive behavior (from layout)

- Hero: script + portrait left, text block right (~1090–1240) — collapses to stacked on mobile.
- Project Section: 1 wide + 2 narrow cards → single column on narrow widths.
- Stats row (Projects) and 2×2 pills (Contact) wrap.
- Nav collapses to the existing mobile menu.
- Tech-stack row: single 11-item row overflows narrow viewports → marquee (per decision).

## 15. Caveats / corrections vs earlier PNG spec

- **Gradient is a single blue `#0494df → #8dd9ff` everywhere** — the earlier "violet/cyan/magenta dark variants" were PNG-render artifacts, not design.
- **Nav links are Fira Sans, not serif.** Script word is **"Hla"** (not "Hello"), Cookie 350px.
- **"Moblite" is a typo** in the standalone Project Section / ProjectWide SVGs; the Home page mock uses "Web & Mobile" — use the correct spelling in code.
- Contact & Work pages have **no dark mock** — dark variants are designed from the token table (§13).
- No dashed rails / grain in the SVG source — the PNG-based spec overstated these.
- Logo tiles and portraits are embedded images — reuse existing `public/assets/` (logos, `saifulmashuri.png`, portfolio screenshots).
