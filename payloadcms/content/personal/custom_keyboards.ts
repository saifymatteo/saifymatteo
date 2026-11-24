import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

const keyboardsUrl = "https://github.com/saifymatteo/Keyboards";

export const projectCustomKeyboards: ProjectContent = {
  slug: "custom-keyboards",
  category: "personal",
  title: "Custom keyboards",
  tagline: "Built for typing and drawing.",
  description:
    "Custom keyboards and a drawing macropad, built for hands-on learning and everyday use.",
  summary:
    "I design and build keyboards, from an ergonomic board to a macropad for my wife’s drawing shortcuts.",
  cover: {
    label: "Two assembled ViktorPad macropads with keycaps and rotary controls",
    src: "/assets/portfolios/keyboards/viktorpad-assembled.webp",
    width: 1400,
    height: 1050,
  },
  platform: "Hardware & firmware",
  role: "Designer and builder",
  techStack: ["QMK", "Vial", "C"],
  links: [{ label: "Source & build files", href: keyboardsUrl }],
  caseStudy: [
    {
      title: "ViktorPad",
      media: [
        {
          label: "ViktorPad: assembled macropads with keys and rotary controls",
          src: "/assets/portfolios/keyboards/viktorpad-assembled.webp",
          width: 1400,
          height: 1050,
        },
        {
          label: "ViktorPad: hand-wired matrix and electronics inside the case",
          src: "/assets/portfolios/keyboards/viktorpad-wiring.webp",
          width: 1400,
          height: 1050,
        },
      ],
      body: [
        "I designed ViktorPad around my wife’s FireAlpaca drawing shortcuts, with Windows shortcuts and volume controls on the same macropad.",
        "It gave me a reason to learn the hardware while building something for another person’s everyday use.",
      ],
      links: [
        {
          label: "Explore ViktorPad",
          href: `${keyboardsUrl}/tree/main/viktorpad`,
        },
      ],
    },
    {
      title: "Spender",
      media: [
        {
          label: "Spender: my assembled ergonomic keyboard",
          src: "/assets/portfolios/keyboards/spender-finished.webp",
          width: 1400,
          height: 1054,
        },
        {
          label: "Spender: hand-wired switches inside the case",
          src: "/assets/portfolios/keyboards/spender-wiring.webp",
          width: 1400,
          height: 1054,
        },
      ],
      body: [
        "I designed Spender from scratch, taking inspiration from Pteron. I wanted to understand keyboard building by making something I could use.",
      ],
      links: [
        {
          label: "Explore Spender",
          href: `${keyboardsUrl}/tree/main/spender`,
        },
        {
          label: "Pteron: design inspiration",
          href: "https://github.com/FSund/pteron-keyboard",
        },
      ],
    },
    {
      title: "Tractyl Manuster",
      media: [
        {
          label:
            "Tractyl Manuster: split keyboard with an integrated trackball",
          src: "/assets/portfolios/keyboards/tractyl-finished.webp",
          width: 1400,
          height: 1054,
        },
        {
          label: "Tractyl Manuster: trackball sensor board and soldered wiring",
          src: "/assets/portfolios/keyboards/tractyl-trackball-sensor.webp",
          width: 1400,
          height: 1050,
        },
      ],
      body: [
        "My Tractyl Manuform is a build of an existing split keyboard with an integrated trackball. The design was based on Dactyl Manuform with modification by adding an integrated trackball.",
        "See below to links for project inspirations and credits."
      ],
      links: [
        {
          label: "Explore Tractyl Manuster",
          href: `${keyboardsUrl}/tree/main/tractyl_manuster`,
        },
        {
          label: "Schievel1: upstream",
          href: "https://github.com/Schievel1/dactyl_manuform_r_track",
        },
        {
          label: "noahprince22: design",
          href: "https://github.com/noahprince22/tractyl-manuform-keyboard",
        },
        {
          label: "u/Tonehaven2: credits",
          href: `https://www.reddit.com/r/ErgoMechKeyboards/comments/l5n0ab/trackball_in_a_dactyl_manuform_5x6_by_uqqurn/`,
        },
      ],
    },
    {
      title: "Firmware and build files",
      body: [
        "The repository includes QMK firmware and Vial configurations. I share the design, wiring and firmware files together so others can inspect the builds.",
      ],
    },
  ],
};
