# Pi extensions: portfolio sources and captures

The portfolio entry uses the owner’s repository documentation and real terminal captures. No stock imagery, generated interface, package-count claim, release date, adoption figure, or performance claim was added.

## Source snapshot

Repository: [saifymatteo/pi-extensions](https://github.com/saifymatteo/pi-extensions), pinned to [`bb49f7ef32190207e3110724699aa18556ad0675`](https://github.com/saifymatteo/pi-extensions/tree/bb49f7ef32190207e3110724699aa18556ad0675).

Reviewed the root README, package manifest, NOTICE, and the READMEs for background shell, compact tool cards, session finder, and CodeGraph. The README describes work in progress and screenshots captured from stock Pi 1.4.0 with a scripted model in an isolated agent home. These show the interface, not measured model behavior or test-coverage evidence. The README still contains pre-publication wording about no GitHub remote; that wording is not copied into the portfolio. No npm publication or cross-host compatibility is asserted.

The case study preserves these boundaries:

- Configuration isolation is not a security sandbox
- Startup checks do not establish interactive rendering or live service compatibility
- External services and CLIs are not bundled
- The CodeGraph adapter and model picker have upstream provenance; the collection is not entirely original code

## Screenshots

Creator/repository author: **Saiful Mashuri (@saifymatteo)**. The source repository declares **AGPL-3.0-only**, copyright © 2026 saifymatteo; no separate screenshot license is declared. These are the portfolio owner’s own published captures. This does not assert a separate permissive license for third-party image reuse. No extension source code is copied into the website.

All four PNGs were downloaded from the pinned commit and converted with installed `sharp` to **lossless WebP**, without resizing or cropping. Dimensions below are measured output pixels. Local paths start at `nextjs/public/assets/portfolios/pi-extensions/`.

| Asset                    | Source                                                                                                                                                         | Dimensions  |  Bytes | Placement                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -----: | ------------------------------------------------ |
| `pi-bg-bash.webp`        | [Original PNG](https://raw.githubusercontent.com/saifymatteo/pi-extensions/bb49f7ef32190207e3110724699aa18556ad0675/packages/pi-bg-bash/screenshot.png)        | 1676 × 1424 | 161752 | Project cover; jobs and code exploration gallery |
| `pi-codegraph.webp`      | [Original PNG](https://raw.githubusercontent.com/saifymatteo/pi-extensions/bb49f7ef32190207e3110724699aa18556ad0675/packages/pi-codegraph/screenshot.png)      | 1676 × 1938 | 181732 | Jobs and code exploration gallery                |
| `pi-compact-tools.webp`  | [Original PNG](https://raw.githubusercontent.com/saifymatteo/pi-extensions/bb49f7ef32190207e3110724699aa18556ad0675/packages/pi-compact-tools/screenshot.png)  | 1676 × 3042 | 267300 | Read and revisit work gallery                    |
| `pi-session-finder.webp` | [Original PNG](https://raw.githubusercontent.com/saifymatteo/pi-extensions/bb49f7ef32190207e3110724699aa18556ad0675/packages/pi-session-finder/screenshot.png) | 1676 × 864  | 103126 | Read and revisit work gallery                    |

The public case study identifies the captures as scripted demonstrations and links each gallery to its package documentation. Its final section links the repository’s source/provenance notices and license. The existing gallery opens full-size captures in the image viewer, which matters for the tall compact-tools and CodeGraph captures.

The hero links to the repository’s existing demo GIF rather than embedding an autoplaying animation. No new motion or remote image dependency is introduced. Existing shared visual components, light/dark themes, and motion behavior remain unchanged.
