import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

export const projectSansols: ProjectContent = {
  slug: "sansols",
  title: "SANSOLS",
  tagline: "Labour applications in Sarawak",
  description:
    "Flutter apps for submitting and reviewing labour applications in Sarawak.",
  summary:
    "I worked on Flutter apps for employers to submit labour applications and government officers to review them.",
  platform: "Web & Mobile",
  date: "2022–2025",
  status: "COMPLETED",
  techStack: [
    "Flutter",
    "Dart",
    "GraphQL",
    "Provider",
    "RxDart",
    "Freezed",
    "OneSignal",
    "Sentry",
    "Geolocator",
    "CI/CD",
  ],
  logo: "/assets/portfolios/sansols/sansols-logo.webp",
  logoDark: "/assets/portfolios/sansols/sansols-logo-light.webp",
  links: [
    {
      label: "Replacement vendor’s service",
      href: "https://genesis.sarawak.gov.my/SANSOLS",
    },
  ],
  role: "Front-end engineer",
  caseStudy: [
    {
      title: "Two sides of an application",
      body: [
        "Employers prepared applications and supporting records, officers reviewed them in a separate app. The workflows covered Approval in Principle (AP), Licences and Licences Renewals, and Foreign Worker and Expat records.",
        "Both apps shared Flutter components and a [typed GraphQL client](/projects/graphql-typesafe-adapter). That shared code meant changes needed to account for both employer and officer screens.",
      ],
    },
    {
      title: "Application screens",
      kind: "preview",
      media: [
        {
          label: "Officer home",
          src: "/assets/portfolios/sansols/sansols-gov-landing-page.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Officer AP review",
          src: "/assets/portfolios/sansols/sansols-gov-ap-processing.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Officer AP summary",
          src: "/assets/portfolios/sansols/sansols-gov-ap-summary.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Officer eVDR and PLKS processing",
          src: "/assets/portfolios/sansols/sansols-gov-evdr-plks-processing.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Officer licence processing",
          src: "/assets/portfolios/sansols/sansols-gov-license-processing.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Employer AP list",
          src: "/assets/portfolios/sansols/sansols-employer-ap-listing.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Employer AP details",
          src: "/assets/portfolios/sansols/sansols-employer-ap-details.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Employer AP application",
          src: "/assets/portfolios/sansols/sansols-employer-apply-ap.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Employer eVDR and PLKS application",
          src: "/assets/portfolios/sansols/sansols-employer-apply-evdr-plks.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Employer licence application: NRE details",
          src: "/assets/portfolios/sansols/sansols-employer-apply-license-nre-details.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Employer licence awaiting payment",
          src: "/assets/portfolios/sansols/sansols-employer-license-payment-pending.webp",
          width: 1534,
          height: 873,
        },
      ],
    },
    {
      title: "My frontend work",
      body: [
        "I maintained the GraphQL client and its recursive fragment compilation. I also worked on reactive state with Provider and RxDart, and Google Maps markers and search.",
        "I maintained development and live web-build automation, coordinated frontend code ownership, and reviewed shared components and screens.",
        "The backend team supplied the API and data model. Shared GraphQL fragments needed careful review: reusing one could request more data than a screen needed.",
      ],
    },
    {
      title: "Where the project ended",
      body: [
        "The project reached a pilot stage before the client changed vendors. The linked Genesis SANSOLS service is a separate implementation.",
        "I’d consolidate duplicated frontend code and standardise repeated UI behaviour. Time constraints left inconsistencies between screens.",
      ],
    },
  ],
};
