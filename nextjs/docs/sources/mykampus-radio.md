# MyKampus Radio — portfolio research

## Scope and evidence snapshot

Research only; no case-study or shared-code changes. GitHub CLI confirmed
`saifymatteo/MKR-Unofficial-App-Flutter` is **PUBLIC** (`isPrivate: false`),
with default branch `master`. Inspected revision:
`210b4a8ef9417d61745df50c6e6537ebd99ba02e` (commit: `chore: run dart format`).
Public source linking is appropriate at this snapshot; recheck visibility before
publishing a later update. Repository creation is recorded as 2022-02-12; that
is not necessarily the project's start date. [G]

This is an **unofficial, fan-made Flutter listening client**, not the broadcaster's
website or current publishing platform. Both the README and package description
make the fan-project relationship explicit. The README calls it the author's
first Flutter project. [R][P]

## Verified implementation (not runtime guarantees)

- **Live audio controls:** `AudioPlayerHandler` wraps `just_audio` in an
  `audio_service` handler. Play/pause controls, loading feedback and playback
  status are wired into the main screen with `StreamBuilder`. Android media
  notification/background-playback integration is configured; actual device
  behavior was not tested. [A][M][H]
- **Now-playing display:** periodic metadata requests feed media items with
  title, artist and artwork into the listening screen, including fallback
  values/artwork. This verifies implementation, not currently working metadata
  delivery or ownership of the underlying service. No service addresses are
  reproduced here. [A][N][L]
- **App navigation:** listening and settings screens use Flutter named routes;
  the drawer launches broadcaster content, social and contact links externally.
  These links do not establish in-app editorial, video or community features.
  Light/dark mode uses `adaptive_theme`, with saved mode loaded at startup.
  [M][D][S]
- **Stack/platform intent:** Flutter/Dart, `just_audio`, `just_audio_windows`,
  `audio_service`, `http`, `adaptive_theme`, `url_launcher`, `desktop_window`.
  Provider is absent from the inspected manifest and entry/UI files. README
  lists Android, iOS, Windows, macOS and web; build instructions cover web,
  Android and Windows. This is cross-platform intent, not proof of release or
  support parity. README still names an older Windows audio dependency; prefer
  the manifest for the current dependency name. [P][R]
- **Contribution attribution:** the repository is under `saifymatteo`; GitHub's
  contributor listing returned that account and Dependabot. Together with the
  first-person README this supports an author-owned personal Flutter project,
  not employment by MKR or proof of sole design/conception. [G][R]

## Broadcaster context and boundaries

The official homepage returned the title **“Platform Indie Online 24 Jam di
Malaysia – Jom Berubah Bersama”** and an editorial headline. This supports an
indie online-media context in Malaysia, not app authorship, endorsement, uptime,
or a claim that Saiful built the current website. [O]

The user describes MKR as a youth platform for discussion and fun. Treat that
as **user-provided organizational context**, not a feature of the Flutter client.
The available homepage extraction did not independently establish an exclusively
student audience, political-awareness remit or local-artist promotion. The
attempted `/about-us/` fetch returned no useful text; a direct homepage request
returned HTTP 403. Do not present the extraction as a full organizational audit.

## Existing claims needing correction or confirmation

Current copy: [`lib/projects/mykampus_radio.ts`](../../lib/projects/mykampus_radio.ts).

| Existing claim                                                                                           | Evidence / recommendation                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2021`, `COMPLETED`                                                                                      | Neither project start date nor completion is established. Repository creation in 2022 does not disprove an earlier start; README still records TODOs. Confirm with author.                          |
| `Provider`                                                                                               | Not supported by the inspected manifest/entry/UI. Use verified dependencies above; historical usage would need an older pinned revision.                                                            |
| “better accessibility”, “wide range of users”                                                            | Valid as intent only. No accessibility audit, adoption data or measured improvement was supplied. Prefer “a separate cross-platform listening interface.”                                           |
| “exclusively for youth”, campus focus, political awareness, local-artist promotion                       | Not independently verified by retrieved official-site content. Attribute the youth/discussion/fun framing to the user or obtain an official description.                                            |
| “Solely responsible for conception, design, implementation”; “reverse-engineered proprietary livestream” | Source supports a personal client and stream integration, not exclusive authorship, the engineering method, proprietary status or authorization. Remove those stronger assertions pending evidence. |

README limitations include web metadata CORS trouble, intermittent stream
breakage, Windows notifications TODO, macOS notarization difficulty and no iOS
IPA/App Store publication due to cost. They are author-reported limitations,
not newly reproduced failures. Existing web-app and Play Store links were not
validated for availability, ownership or current distribution. No downloads,
listener counts, business outcomes or usability metrics were established. [R]

## Recommended copy

**Title:** MyKampus Radio — Unofficial Flutter Client

**Short description:** A personal Flutter project that brings MyKampus Radio
listening controls into a cross-platform app. [R][M][H]

**About:** I built an unofficial listening client for MyKampus Radio using
Flutter and Dart. The app combines live-audio controls, a now-playing display,
light/dark themes and links to the broadcaster's content. [R][A][L][S][D]

**Contribution:** Implemented the Flutter client UI and integrated audio playback
and metadata display using `just_audio` and `audio_service`. [M][A][N][L]

**Context, if retaining the user's framing:** MyKampus Radio is described by the
project owner as a youth platform for discussion and entertainment. This project
is an independent fan-made client, not the broadcaster's website or publishing
platform. [User context; R/P establish unofficial status.]

Label links **“Broadcaster website”** and **“Source code”** rather than implying
the official website is the project's deliverable. Keep deployment/store links
only after a separate availability check. Say “designed for multiple platforms,”
not “available everywhere.” Do not add outcomes or a client/commissioned role.

## Existing image provenance

All current assets are under
`nextjs/public/assets/portfolios/my_kampus_radio/`:

| Asset                        | Actual dimensions | Existing portfolio label |
| ---------------------------- | ----------------- | ------------------------ |
| `mkr-home.webp`              | 1647 × 942        | Web Home Page            |
| `mkr-side-panel.webp`        | 1647 × 942        | Web Side Navigation      |
| `mkr-home-mobile.webp`       | 1080 × 2283       | Mobile Home Page         |
| `mkr-side-panel-mobile.webp` | 1080 × 2287       | Mobile Side Navigation   |
| `mkr-logo.webp`              | 338 × 204         | Project logo             |

Local Git commit `24147d6b3ee4e83ab214dac30725e54d4638cce4`
(`[nextjs] fix: replace png assets with webp`) replaces the five same-named PNGs
with these WebPs. Matching PNG filenames remain in
`flutter_web/assets/portfolios/my_kampus_radio/`, added there by commit
`880df25053e45bd9ccbd23c4c1a24409fafd451e`. This establishes portfolio asset
history, not original capture date, photographer, logo authorship or reuse
permission. [I]

Visual inspection of `mkr-home.webp` shows the Flutter listening UI with MKR
branding, a now-playing title/artist and Play control—not the broadcaster's
editorial website. The other screenshot labels above are existing labels,
not independently authenticated captures. The upstream README embeds a demo,
and its tree includes promotional screenshots; no exact match to these local
captures was established. Retain them as historical app previews, not proof of
current platform behavior, design ownership or a specific release. [R][I]

## Primary references

All application source references below are pinned to the inspected public SHA.
GitHub metadata, the official website and user context are inherently unpinned.

- [G] GitHub API checks: `gh repo view saifymatteo/MKR-Unofficial-App-Flutter --json nameWithOwner,visibility,isPrivate,defaultBranchRef,description,url,createdAt,updatedAt,pushedAt`; `gh api repos/saifymatteo/MKR-Unofficial-App-Flutter/commits/master`; `gh api repos/saifymatteo/MKR-Unofficial-App-Flutter/contributors`. [Public repository](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter).
- [R] [README](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/README.md).
- [P] [Package manifest](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/pubspec.yaml).
- [M] [App initialization and routes](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/main.dart).
- [A] [Audio handler](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/utils/audio_handler.dart).
- [N] [Metadata adapter](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/utils/audio_metadata.dart).
- [H] [Main screen](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/screens/main_screen.dart).
- [L] [Listening screen](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/screens/listen_now_screen.dart).
- [S] [Settings](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/screens/settings_screen.dart).
- [D] [Drawer](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter/blob/210b4a8ef9417d61745df50c6e6537ebd99ba02e/lib/components/drawer.dart).
- [O] [Official broadcaster homepage](https://mykampusradio.com/) (limited extracted content).
- [I] Local evidence: `git show --stat 24147d6b3ee4e83ab214dac30725e54d4638cce4 -- nextjs/public/assets/portfolios/my_kampus_radio`; `git log --diff-filter=A -- flutter_web/assets/portfolios/my_kampus_radio`; Pillow image dimensions; direct viewing of `mkr-home.webp`. Existing labels from `lib/projects/mykampus_radio.ts`.

## Verification limits

Inspected README, manifest and seven selected Dart files at the pinned SHA;
checked public visibility, default-branch metadata, contributors and local image
history/dimensions. No app build, playback test, device test, store verification
or rights/affiliation confirmation was performed. Source inspection establishes
implemented behavior only; the current revision does not date historical
screenshots or prove what shipped in 2021. No secrets, configuration contents,
service endpoints or private source excerpts are included.

## Portfolio copy update and link checks

The copy now distinguishes the independent, unofficial Flutter listening client from MKR’s youth discussion and entertainment platform. It replaces Provider with the inspected audio/theme dependencies, removes proprietary reverse-engineering and sole-authorship assertions, and names repository-documented platform limits. The existing 2021 date and developer role remain owner-provided history, not newly established repository facts. Existing routes and four app screenshots remain unchanged.

Direct HTTP checks returned 200 for the broadcaster, web-client and Android listing URLs. Browser checks found the web-client document title “MyKampus Radio Unofficial” and a matching Google Play listing under saifymatteo. Flutter canvas content did not expose a readable accessibility tree in this check; live playback was not tested. The listing and web-client links are retained with bounded labels, not advertised as verified playback availability. No store download figures were copied into the portfolio.
