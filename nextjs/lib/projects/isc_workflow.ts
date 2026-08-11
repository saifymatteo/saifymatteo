import type { Project } from './projects';
import { descriptionPlaceholder, placeholderCaseStudy } from './utils';

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
  logo: '/assets/portfolios/isc_workflow/isc-logo.png',
  screenshots: [
    {
      label: 'Landing Page',
      src: '/assets/portfolios/isc_workflow/isc-landing.png',
    },
    {
      label: 'Home Page',
      src: '/assets/portfolios/isc_workflow/isc-home.png',
    },
    {
      label: 'Listing Page',
      src: '/assets/portfolios/isc_workflow/isc-listing.png',
    },
    {
      label: 'KGC Listing Page',
      src: '/assets/portfolios/isc_workflow/isc-kgc-listing.png',
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
  heroDescription: descriptionPlaceholder('iSC Workflow'),
  caseStudy: placeholderCaseStudy('iSC Workflow'),
  wip: true,
};
