import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

const repository = "https://github.com/saifymatteo/pi-extensions";

export const projectPiExtensions: ProjectContent = {
  slug: "pi-extensions",
  category: "personal",
  title: "Pi extensions",
  tagline: "Tools from my coding workflow.",
  description:
    "Tools from my Pi coding workflow, packaged as extensions for others to use.",
  summary:
    "My daily drive extensions for my Pi coding-agent setup, including background jobs and session search.",
  platform: "Developer tooling",
  role: "Author",
  status: "ONGOING",
  techStack: ["TypeScript", "Node.js", "GitHub Actions"],
  cover: {
    label: "Pi extensions: background shell jobs in a scripted demo session",
    src: "/assets/portfolios/pi-extensions/pi-bg-bash.webp",
    width: 1676,
    height: 1424,
  },
  links: [
    { label: "Source and packages", href: repository },
    { label: "Demo", href: `${repository}/main/demo.gif` },
  ],
  caseStudy: [
    {
      title: "Jobs and code exploration",
      body: [
        "pi-bg-bash let an agent start a command and keep working. Exit status and output arrive separately, and pi-wait joins results when needed.",
        "The pi-codegraph connects an external source-exploration tool to Pi and keeps its index in sync through session hooks.",
        "The screenshots use stock Pi 1.4.0 and a scripted demo model. They show the interface only, no measured agent performance or test coverage.",
      ],
      media: [
        {
          label: "Background job and result",
          src: "/assets/portfolios/pi-extensions/pi-bg-bash.webp",
          width: 1676,
          height: 1424,
        },
        {
          label: "CodeGraph source exploration",
          src: "/assets/portfolios/pi-extensions/pi-codegraph.webp",
          width: 1676,
          height: 1938,
        },
      ],
      links: [
        {
          label: "pi-bg-bash",
          href: `${repository}/tree/main/packages/pi-bg-bash`,
        },
        {
          label: "pi-codegraph",
          href: `${repository}/tree/main/packages/pi-codegraph`,
        },
      ],
    },
    {
      title: "Find and follow earlier transcript",
      body: [
        "pi-compact-tools group consecutive calls into expandable summaries, keeping each call’s status and output. The pi-session-finder searches across projects and groups conversation forks so I can reopen or branch from earlier work.",
        "Other packages add clipboard images, code blocks and model selection. Adapters connect workspace search, classification, speech and vision to separately configured services or tools, but those services aren’t bundled.",
      ],
      media: [
        {
          label: "Compact tool cards, collapsed and expanded",
          src: "/assets/portfolios/pi-extensions/pi-compact-tools.webp",
          width: 1676,
          height: 3042,
        },
        {
          label: "Session finder with conversation forks",
          src: "/assets/portfolios/pi-extensions/pi-session-finder.webp",
          width: 1676,
          height: 864,
        },
      ],
      links: [
        {
          label: "pi-compact-tools",
          href: `${repository}/tree/main/packages/pi-compact-tools`,
        },
        {
          label: "pi-session-finder",
          href: `${repository}/tree/main/packages/pi-session-finder`,
        },
      ],
    },
    {
      title: "Extension toolings",
      body: [
        "Each extension has its own manifest, docs, licence and provenance notice. Packages can load individually or together, user may use as they see fit.",
        "Checks cover package boundaries, behaviour with host stubs and isolated startup. The disposable development directory is not a security sandbox: extensions retain the host’s operating-system permissions.",
      ],
      links: [
        { label: "Package catalogue", href: `${repository}#package-catalogue` },
      ],
    },
    {
      title: "Compatibility and credits",
      body: [
        "Terminal patches depend on the Pi version. Startup checks don’t prove interactive rendering or live service compatibility. Try one package at a time, without loading the collection alongside individual copies.",
        "Some packages adapt existing work. The pi-codegraph builds on an upstream MIT adapter, the model picker comes from oc-models-pro. Packages use AGPL-3.0-only and retain upstream notices. Pi, CodeGraph and the external services are separate projects.",
      ],
      links: [
        {
          label: "Credits and upstream notices",
          href: `${repository}/blob/main/NOTICE.md`,
        },
        {
          label: "AGPL-3.0-only licence",
          href: `${repository}/blob/main/LICENSE`,
        },
      ],
    },
  ],
};
