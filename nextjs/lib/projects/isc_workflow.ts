import type { Project } from './projects';

export const projectIscWorkflow: Project = {
  slug: 'isc-workflow',
  name: 'iSC Workflow',
  tagline: 'iSarawakCare Workflow',
  fullTitle: 'iSC Workflow',
  description:
    "Web form builder owned by Sarawak state, designed to reduce constraints between state's initiatives and applicants",
  platform: 'Web',
  date: '2020-Present',
  status: 'ONGOING',
  techStack: ['Flutter', 'Dart', 'Provider', 'Freezed', 'CI/CD', 'Playwright'],
  logo: '/assets/portfolios/isc_workflow/isc-logo.webp',
  logoDark: '/assets/portfolios/isc_workflow/isc-logo-light.webp',
  screenshots: [
    {
      label: 'Landing Page',
      src: '/assets/portfolios/isc_workflow/isc-landing.webp',
    },
    {
      label: 'Home Page',
      src: '/assets/portfolios/isc_workflow/isc-home.webp',
    },
    {
      label: 'Listing Page',
      src: '/assets/portfolios/isc_workflow/isc-listing.webp',
    },
    {
      label: 'KGC Listing Page',
      src: '/assets/portfolios/isc_workflow/isc-kgc-listing.webp',
    },
  ],
  links: [
    { label: 'Website', href: 'https://isarawakcare.sarawak.gov.my/' },
    {
      label: 'Web App',
      href: 'https://isarawakcare.sarawak.gov.my/apply-now/',
    },
  ],
  meta: {
    role: 'Front-end engineer',
    year: '2020-Present',
    status: 'ONGOING',
    stack: 'Flutter, Dart, Provider',
  },
  heroDescription:
    "Empowering the Ministry of Women, Early Childhood, and Community Wellbeing Development (KPWK) through a dedicated government application designed for seamless administration of Minister's benefits. The iSC Workflow app provides KPWK administrators with the tools to create and manage application forms, fostering accessibility for the public to apply for benefits effortlessly.",
  caseStudy: [
    {
      number: '01',
      title: 'Key Features',
      body: [
        '- Empowers administrators to construct application forms tailored to specific applicant requirements.',
        '- Enhances flexibility by allowing dynamic creation and modification of forms as needed.',
        '- Facilitates efficient processing by defining step-by-step procedures for application evaluation.',
        '- Incorporates an email notification system that notifies applicants promptly upon application approval or rejection.',
      ],
    },
    {
      number: '02',
      title: 'Preview',
      media: [
        {
          label: 'Landing Page',
          src: '/assets/portfolios/isc_workflow/isc-landing.webp',
        },
        {
          label: 'Home Page',
          src: '/assets/portfolios/isc_workflow/isc-home.webp',
        },
        {
          label: 'Listing Page',
          src: '/assets/portfolios/isc_workflow/isc-listing.webp',
        },
        {
          label: 'KGC Listing Page',
          src: '/assets/portfolios/isc_workflow/isc-kgc-listing.webp',
        },
      ],
    },
    {
      number: '03',
      title: 'My Contributions',
      body: [
        '- Responsible for seamlessly integrating the iSC Workflow with the State Integrated Financial, Budgeting, Accounting System (SIFBAS).',
        '- Co-led the integration of multilingual support, offering translations in Bahasa Malaysia, English, and Mandarin.',
        '- Played a key role in refactoring the form builder for optimal performance and user experience.',
        '- Ensured seamless integration with OVMI (One Voucher Multiple Instruction) based on past integration.',
      ],
    },
  ],
  wip: true,
};
