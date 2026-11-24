import type { ProjectContent } from "../../../nextjs/lib/projects/projects.ts";

export const projectIscWorkflow: ProjectContent = {
  slug: "isc-workflow",
  title: "iSarawakCare",
  tagline: "Applications for government initiatives",
  description:
    "A Flutter web app for applying to Sarawak government initiatives and managing submissions.",
  summary:
    "I work on iSarawakCare’s Flutter web app, where people apply for government initiatives and staff manage their applications.",
  platform: "Web",
  date: "2020–present",
  status: "ONGOING",
  techStack: ["Flutter", "Dart", "Provider", "Freezed", "AutoRoute", "CI/CD"],
  logo: "/assets/portfolios/isc_workflow/isc-logo.webp",
  logoDark: "/assets/portfolios/isc_workflow/isc-logo-light.webp",
  links: [
    {
      label: "Homepage",
      href: "https://isarawakcare.sarawak.gov.my/",
    },
    {
      label: "Web App",
      href: "https://isarawakcare.sarawak.gov.my/apply-now/",
    },
  ],
  role: "Front-end engineer",
  contents: [
    {
      title: "From forms to submissions",
      body: [
        "Administrators configure forms and review submissions. Applicants provide supporting information and can resubmit when needed.",
        "Changes to a shared form need to work in the editor, applicant screens and administrative review.",
        "The public information website is separate from the Flutter application shown here.",
      ],
    },
    {
      title: "Applicant and admin screens",
      kind: "preview",
      media: [
        {
          label: "Admin home",
          src: "/assets/portfolios/isc_workflow/isc-admin-landing.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Admin initiative list",
          src: "/assets/portfolios/isc_workflow/isc-admin-form-listing.webp",
          width: 1647,
          height: 942,
        },
        {
          label: "Admin form builder",
          src: "/assets/portfolios/isc_workflow/isc-admin-initiative-form-builder.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Admin application review",
          src: "/assets/portfolios/isc_workflow/isc-admin-applicants-processing.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Admin initiative settings",
          src: "/assets/portfolios/isc_workflow/isc-admin-manage-initiative.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Applicant home",
          src: "/assets/portfolios/isc_workflow/isc-public-landing.webp",
          width: 1534,
          height: 873,
        },
        {
          label: "Applicant submission form",
          src: "/assets/portfolios/isc_workflow/isc-public-apply-initiative.webp",
          width: 1534,
          height: 873,
        },
      ],
    },
    {
      title: "My work on the app",
      body: [
        "I worked on the form builder’s shared UI, field configuration and validation. I also helped add English, Bahasa Malaysia and Chinese language support.",
        "My client-side integration work connected screens to the SIFBAS (State Integrated Financial, Budgeting and Accounting System). I also connected screens to OVMI (One Voucher Multiple Instruction) processing.",
        "The backend team supplied the financial APIs. I worked on the app, not the external financial systems.",
      ],
    },
  ],
};
