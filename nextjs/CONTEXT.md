# Context: NextJS Portfolio (saifymatteo)

The portfolio website for Saiful Mashuri ("saifymatteo"), built with Next.js. This glossary covers the domain language used across the site and its content data.

- **Portfolio** — the set of real-world projects the site presents. Currently three: SANSOLS, iSC Workflow, MyKampus Radio Unofficial App.
- **Project** — a portfolio entry with its own page. Carries identity (name, tagline, platform, dates, status), evidence (logo, screenshots, links) and a **case study**.
- **Case study** — the long-form page for a single project (`/projects/<slug>`): a hero with project facts and links, then seven numbered sections — Problem, Preview, My Contributions, Key Decisions, Trade-offs, Result, What Can Be Improve. A case study is either _complete_ or _draft_ (placeholder copy pending).
- **Featured Works** — the curated preview of projects on the home page (one wide card + two narrow cards), distinct from the full **Projects** listing page.
- **Project card** — a compact presentation of a project. Two variants: _wide_ (two-column, logo panel beside content) and _narrow_ (vertical stack).
- **Tech stack ticker** — the horizontal scrolling strip listing technologies (Flutter, Dart, React, …).
- **Pill** — a fully rounded badge used for platform, status, tech tags and call-to-action buttons.
- **Hero** — the full-bleed branded banner (blue gradient) at the top of a page.
- **Theme** — the site's light or dark appearance; a single system-wide setting.
- **Contact CTA** — the "Interested?" invitation card linking to the contact page.
- **Scroll reveal** — a subtle entrance animation (fade + slight rise) applied to a section or card the first time it scrolls into view; plays once.
- **Entrance animation** — the staggered fade-up the home hero plays on page load (portrait, name block, role pill).
- **Micro-interaction** — small hover/active feedback on interactive elements: card lift, nav link underline, "Case Study →" arrow nudge, button press.
- **Page transition** — the short fade-in applied when a route mounts; there is deliberately no exit animation (App Router limitation).
- **Reduced motion** — honoring `prefers-reduced-motion`: transform-based animations are disabled while opacity fades remain.
