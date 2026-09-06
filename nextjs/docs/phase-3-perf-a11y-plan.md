# Phase 3 — Performance & Accessibility batch (post-Phase-2 pickup)

Status: **ACTIVE — in execution**. Renamed from "Phase 1.5" (user decision, 2026-09-06): Phase 2 shipped first, so the perf batch is simply Phase 3.
Origin: Lighthouse reports (`reports/saifulmashuri.com-20260906T221655.json` desktop,
`...221747.json` mobile) + grill round. Desktop 73 / mobile 42 as measured.

## 0. Measurement truth (read this first)

The captured reports are **partially a measurement of the tester's browser**:

| Report claim                                                                                                                 | Reality                                                |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 269KB unused CSS `content.css`                                                                                               | Dashlane extension stylesheet (`chrome-extension://…`) |
| ~910KB of the 1,299KB unused JS (`content.js` 356KB, `bootstrap-autofill-overlay.js` 340KB, `detector/copier.dart.js` 324KB) | Dashlane + Edge internals                              |
| 5 of 6 "missing source maps"                                                                                                 | `chrome-extension://` scripts                          |
| Deprecations (Shared Storage / Protected Audience API)                                                                       | Edge browser internals                                 |
| Console error `ERR_BLOCKED_BY_CLIENT`                                                                                        | An adblocker blocking the Cloudflare beacon            |
| `installHook.js` in bootup                                                                                                   | React DevTools                                         |

Real scores are meaningfully higher. **Protocol (ratified, Q4): one PageSpeed
Insights run after this batch is the only measurement that matters** (CrUX
field data will not exist for this domain). Watch TBT and LCP, not the score —
the score is a diagnostic, not a KPI.

## 1. The three real problems

### P1 — LCP chain defect (confirmed in production HTML)

- Hero portrait (the LCP element) is served via `/_next/image?...&w=1200&q=75`,
  which **302-redirects** to the original webp — the optimizer is a no-op
  pass-through on Workers (free plan, ADR-0004). Every image pays a wasted RTT.
- The LCP request has no `fetchpriority=high` (`lcp-discovery-insight`
  fails on exactly `priorityHinted: false`).
- Fix: set `unoptimized` (direct URLs, no redirect hop — images are already
  right-sized webp) + `priority`/`fetchPriority="high"` on the portrait. If
  vinext drops the attribute, hand-add `<link rel="preload" as="image"
fetchpriority="high">` in the home head. Verify against built HTML.

### P2 — the shader never rests (the one real main-thread cost)

- `@shadergradient/react` = 265KB three.js chunk, `lazyLoad={false}`, full-rAF
  forever, two instances on home (hero + projects band). ~460ms desktop /
  ~1.3s throttled-mobile scripting, even offscreen. Laptop battery cost.
- **Ratified (Q1): the shader stays everywhere, including mobile.** Mobile
  fallback via dynamic import was offered and rejected — the shader is the
  site's unique look.
- **Ratified direction (Q2): frozen-frame pause.** The user tried
  `lazyLoad={true}` and rejected it — the canvas unmounts to the plain CSS
  gradient (visible seam). The fix keeps `lazyLoad={false}` and adds our own
  wrapper logic (library source confirms feasibility):
  1. `preserveDrawingBuffer={true}` (supported prop, passes through to
     three.js) + query the canvas via `wrapRef` (the lib hardcodes
     `id="gradientCanvas"` on **both** instances — do not query by id).
  2. IntersectionObserver on the wrapper section:
     - exit → `canvas.toDataURL('image/webp'|'image/png', …)` snapshot →
       paint it over the wrapper → unmount the canvas (React state).
     - enter → remount canvas under the snapshot → cross-fade the snapshot
       out once rendering (canvas restarts at t=0; the cross-fade masks it).
  - Result: zero GPU/CPU while offscreen; identical visuals.
- **Evaluated and rejected: migrating to shaders.com.** Different vendor
  (commercial WebGPU library); its "auto ~1fps offscreen" is the inspiration,
  not an upgrade path — the look would need re-creation + licensing.
- Also (cheap, independent): `next/dynamic` + `ssr:false` the ShaderBackdrop
  so the 265KB chunk leaves the critical path; the CSS gradient already
  paints behind the canvas by design.

### P3 — two real WCAG failures (Lighthouse-confirmed)

- Hero Pill ("Software Engineer") fails color-contrast on the gradient in
  **both** reports — legacy `text-secondary-foreground` renders brand accent
  on canvas-white: ~3.4:1. **This is fixed in Phase 2** (pill = parchment bg +
  ink text ⇒ ~15.9:1 light / ~12:1 dark) — acceptance criterion, not a patch.
- Mobile `<MenubarTrigger><Menu/></MenubarTrigger>` is icon-only with no
  accessible name (`button-name` fails; same root cause as the
  `agentic-browsing 50`). One-line `aria-label` — piggyback on Phase 2.

## 2. Piggyback items already ratified (execute in Phase 2, no further ask)

- Fira Sans weights `100–900` → `['300','400','600','700']` (the ratified
  ladder; drops ~5 woff2 files ≈ 90KB + 5 requests from the wire).
- Pill contrast via the Phase 2 token migration (see P3).
- Amend ADR-0004: the "fonts load from Google CDN" caveat is **stale** — the
  reports prove fonts are self-hosted same-origin (`/_next/static/_vinext_fonts/`);
  the image optimizer is a 302 pass-through (see P1).

## 3. Explicitly declined (do not chase)

- Deprecation warnings, extension JS, the Cloudflare challenge script
  (protects the contact API — keep), first-party source maps (at most hidden
  maps later), React/motion execution floor.
- Mobile score 100 on simulated slow-4G for a decorative-WebGL portfolio.

## 4. Expected honest outcome

After this batch + a clean PSI run: desktop low-90s; mobile plausibly 60–75
(simulated Moto-G slow-4G is a worst-plausible-visitor model). The score is
the diagnostic; the three real wins are: late-paint LCP on slow networks,
idle shader CPU/battery, and a screen-reader- (and agent-) readable nav.
