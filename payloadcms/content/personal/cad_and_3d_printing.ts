import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

const rackUrl =
  "https://makerworld.com/en/models/2942296-kitchen-silverware-dry-hanging-bin-rack#profileId-3295426";
const trayUrl =
  "https://makerworld.com/en/models/2462935-tray-for-sofa-arm-chair-with-curve-parametric#profileId-2703725";
const geckoBowlUrl =
  "https://makerworld.com/en/models/3577548-gecko-mealworm-bowl-no-support#profileId-4096058";
const makerWorldProfileUrl = "https://makerworld.com/en/@saifymatteo/upload";

export const projectCadAnd3dPrinting: ProjectContent = {
  slug: "cad-and-3d-printing",
  category: "personal",
  title: "CAD & 3D printing",
  tagline: "Practical objects, made to fit.",
  description:
    "A kitchen utensil rack I designed to fit my setup, alongside practical 3D-printing adaptations.",
  summary:
    "I use CAD and 3D printing to solve problems around the house. My projects include a kitchen utensil rack and a simple tray for sofa arm chair.",
  cover: {
    label:
      "My printed hanging kitchen bins holding utensils on the kitchen rack",
    src: "/assets/portfolios/cad/kitchen-rack-installed.webp",
    width: 1080,
    height: 810,
  },
  platform: "Physical design",
  role: "Original designer & model modifier",
  techStack: ["Fusion", "STEP", "3D printing"],
  links: [
    {
      label: "All my MakerWorld uploads",
      href: "https://makerworld.com/en/@saifymatteo/upload",
    },
  ],
  caseStudy: [
    {
      title: "A rack for my kitchen",
      media: [
        {
          label: "Kitchen rack: printed bins holding utensils in my kitchen",
          src: "/assets/portfolios/cad/kitchen-rack-installed.webp",
          width: 1080,
          height: 810,
        },
        {
          label: "Kitchen rack: the separate printed bin and mounting hook",
          src: "/assets/portfolios/cad/kitchen-rack-detail.webp",
          width: 1400,
          height: 1050,
        },
      ],
      body: [
        "I designed hanging bins for the kitchen rack I already had. Each bin has a separate mounting hook.",
        "The bins come in three heights: 80 mm for small spoons, 100 mm for standard spoons, and 120 mm for longer utensils. The default hook mounting size is 16 × 30.5 mm.",
        "Some dimensions are parametric. I share Fusion and STEP files so you can adapt the fit to your own setup.",
      ],
      links: [{ label: "View the rack & editable files", href: rackUrl }],
    },
    {
      title: "Simple tray for my wife's arm chair",
      body: [
        "I went through few iterations to get the strength and angle correctly for my wife to put her mouse on top of it.",
        "She uses an arm chair cover which covers the whole chair, but needed a flat surface to put her mouse the arm section.",
        "I made designed this to solve her problem and the model has been going strong for few months now.",
      ],
      links: [{ label: "View the tray & editable files", href: trayUrl }],
    },
    {
      title: "Pet Gecko bowl",
      body: [
        "A really dead simple model for my wife pet Gecko.",
        "I designed this instead of re-using existing design because others require support to print. My design uses angled approach for the inner wall/cavity, so no support is required.",
      ],
      links: [{ label: "View the bowl & editable files", href: geckoBowlUrl }],
    },
    {
      title: "Made for everyday use",
      body: [
        "I also share desk clamps, replacement parts and household holders on MakerWorld. You can inspect, print or adapt the uploads where their files and licences allow.",
      ],
      links: [{ label: "View all my models", href: makerWorldProfileUrl }],
    },
  ],
};
