import type { Project } from './projects';

export const projectIscWorkflow: Project = {
  slug: 'isc-workflow',
  title: 'iSC Workflow',
  tagline: 'iSarawakCare Workflow',
  description:
    "Web form builder owned by Sarawak state, designed to reduce constraints between state's initiatives and applicants",
  summary:
    'Flutter web app and a platform to apply for Sarawak Government assistance under the Ministry of Women, Early Childhood and Community Wellbeing Development (KPWK) for the well-being of all Sarawakians',
  platform: 'Web',
  date: '2020-Present',
  status: 'ONGOING',
  techStack: ['Flutter', 'Dart', 'Provider', 'Freezed', 'CI/CD', 'Playwright'],
  logo: '/assets/portfolios/isc_workflow/isc-logo.webp',
  logoDark: '/assets/portfolios/isc_workflow/isc-logo-light.webp',
  links: [
    { label: 'Website', href: 'https://isarawakcare.sarawak.gov.my/' },
    {
      label: 'Web App',
      href: 'https://isarawakcare.sarawak.gov.my/apply-now/',
    },
  ],
  role: 'Front-end engineer',
  caseStudy: [
    {
      title: 'Key Features',
      body: [
        "Enable administrators to construct application forms tailored to specific Sarawak state government's initiatives requirements.",
        'Allow flexibility by allowing dynamic creation and modification of application forms as needed.',
        'Incorporates notification system that notifies applicants promptly upon application approval or rejection.',
      ],
    },
    {
      title: 'Preview',
      media: [
        {
          label: 'Admin Landing',
          src: '/assets/portfolios/isc_workflow/isc-admin-landing.webp',
          width: 1647,
          height: 942,
        },
        {
          label: 'Admin Initiative Listing',
          src: '/assets/portfolios/isc_workflow/isc-admin-form-listing.webp',
          width: 1647,
          height: 942,
        },
        {
          label: 'Admin Initiative Form Builder',
          src: '/assets/portfolios/isc_workflow/isc-admin-initiative-form-builder.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Admin Applications Processing',
          src: '/assets/portfolios/isc_workflow/isc-admin-applicants-processing.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Admin Manage Initiatives',
          src: '/assets/portfolios/isc_workflow/isc-admin-manage-initiative.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Public Landing',
          src: '/assets/portfolios/isc_workflow/isc-public-landing.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Public Apply Initiative',
          src: '/assets/portfolios/isc_workflow/isc-public-apply-initiative.webp',
          width: 1534,
          height: 873,
        },
      ],
    },
    {
      title: 'My Contributions',
      body: [
        'Responsible for seamlessly integrating the iSC Workflow with the State Integrated Financial, Budgeting, Accounting System (SIFBAS).',
        'Co-led the integration of multilingual support, offering translations in Bahasa Malaysia, English, and Mandarin.',
        'Played a key role in refactoring the form builder for optimal performance and user experience.',
        'Ensured seamless integration with OVMI (One Voucher Multiple Instruction) based on past integration.',
      ],
    },
  ],
};
