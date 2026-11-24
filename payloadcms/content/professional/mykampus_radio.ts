import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

export const projectMyKampusRadio: ProjectContent = {
  slug: "my-kampus-radio",
  title: "MyKampus Radio",
  tagline: "An unofficial live-radio client",
  description:
    "An unofficial Flutter app for listening to MyKampus Radio, with live playback and track details.",
  summary:
    "I built an unofficial Flutter app for listening to MyKampus Radio, a youth platform for discussion and entertainment.",
  platform: "Web & Android",
  date: "2021",
  status: "COMPLETED",
  techStack: [
    "Flutter",
    "Dart",
    "just_audio",
    "audio_service",
    "adaptive_theme",
  ],
  logo: "/assets/portfolios/my_kampus_radio/mkr-logo.webp",
  logoDark: undefined,
  links: [
    {
      label: "Github",
      href: "https://github.com/saifymatteo/MKR-Unofficial-App-Flutter",
    },
    { label: "Web App", href: "https://mkr.saifulmashuri.com/" },
    { label: "MKR Homepage", href: "https://mykampusradio.com/" },
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.saifymatteo.mkr_flutter",
    },
  ],
  role: "Developer",
  contents: [
    {
      title: "A personal listening app",
      body: [
        "The app puts playback controls and current track details in one place. It also links to MKR’s content and social channels.",
        "It’s an independent fan project, separate from the broadcaster’s website and editorial work.",
      ],
    },
    {
      title: "Web and mobile screens",
      kind: "preview",
      media: [
        {
          label: "Web player",
          src: "/assets/portfolios/my_kampus_radio/mkr-home.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Web navigation",
          src: "/assets/portfolios/my_kampus_radio/mkr-side-panel.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Mobile player",
          src: "/assets/portfolios/my_kampus_radio/mkr-home-mobile.webp",
          width: 1080,
          height: 2283,
        },
        {
          label: "Mobile navigation",
          src: "/assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.webp",
          width: 1080,
          height: 2287,
        },
      ],
    },
    {
      title: "Connecting playback to the interface",
      body: [
        "I used [`just_audio`](https://pub.dev/packages/just_audio) and [`audio_service`](https://pub.dev/packages/audio_service) to connect playback to the Flutter interface. Stream updates drive playback state and the now-playing display, including track details and artwork.",
        "I added light and dark themes, plus links to MKR’s contact details. The Android client includes media notifications and background playback integration.",
        "The app relies on MKR’s stream and track metadata. The [repository](https://github.com/saifymatteo/MKR-Unofficial-App-Flutter) documents web metadata restrictions, intermittent stream failures, and playback or distribution limits on other platforms.",
      ],
    },
  ],
};
