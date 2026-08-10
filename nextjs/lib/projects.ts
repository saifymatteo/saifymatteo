/**
 * Portfolio content — typed local data (see docs/adr/0001-content-as-local-typed-data.md).
 * Copy for SANSOLS comes from design/pages/Work - Light.svg.
 * iSC Workflow & MyKampus Radio case studies are placeholders (wip: true) — fill in later.
 */

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'ARCHIVED';

export interface CaseStudySection {
  number: string;
  title: string;
  /** Paragraphs or bullet points. */
  body?: string[];
  /** Screenshot captions for the Preview section. */
  media?: { label: string; src: string }[];
}

export interface Project {
  slug: string;
  name: string;
  /** Hero subtitle on the case-study page. */
  tagline: string;
  /** Card title on Home/Projects pages. */
  fullTitle: string;
  /** Card body copy. */
  description: string;
  platform: string;
  /** Card meta row. */
  date: string;
  status: ProjectStatus;
  techStack: string[];
  logo: string;
  screenshots: { label: string; src: string }[];
  links: { label: string; href: string }[];
  /** Info cards on the case-study hero. */
  meta: { role: string; year: string; status: string; stack: string };
  /** Case-study hero description. */
  heroDescription: string;
  caseStudy: CaseStudySection[];
  /** True while case-study copy is placeholder. */
  wip?: boolean;
}

const CASE_STUDY_TITLES = [
  'Problem',
  'Preview',
  'My Contributions',
  'Key Decisions',
  'Trade-offs',
  'Result',
  'What Can Be Improve',
];

function placeholderCaseStudy(name: string): CaseStudySection[] {
  return CASE_STUDY_TITLES.map((title, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title,
    ...(title === 'Preview'
      ? { media: [] }
      : { body: ['Lorem ipsum — pending case-study copy for ' + name] }),
  }));
}

function descriptionPlaceholder(name: string): string {
  return 'Lorem ipsum — pending case-study description for ' + name;
}

export const projects: Project[] = [
  {
    slug: 'sansols',
    name: 'SANSOLS',
    tagline: 'Sarawak & Non-Sarawakian Labour System',
    fullTitle: 'SANSOLS - Sarawak & Non-Sarawakian Labour System',
    description:
      'Sarawak state owned labour system app designed to drastically reduce the processing time for handling Workers and Foreign Workers',
    platform: 'Web & Mobile',
    date: '2022-2025',
    status: 'COMPLETED',
    techStack: [
      'Flutter',
      'Dart',
      'Provider',
      'RxDart',
      'Freezed',
      'OneSignal',
      'Sentry',
      'Geolocator',
      'CI/CD',
      'Playwright',
    ],
    logo: '/assets/portfolios/sansols/sansols-logo.png',
    screenshots: [
      {
        label: 'Landing Page',
        src: '/assets/portfolios/sansols/sansols-landing.png',
      },
      {
        label: 'Government Home Page',
        src: '/assets/portfolios/sansols/sansols-gov-home-page.png',
      },
      {
        label: 'AP Listing Page',
        src: '/assets/portfolios/sansols/sansols-employer-ap-listing.png',
      },
      {
        label: 'AP Details Page',
        src: '/assets/portfolios/sansols/sansols-employer-ap-details.png',
      },
    ],
    links: [
      { label: 'Web App (Employer)', href: 'https://sansols.sarawak.gov.my/' },
      {
        label: 'Web App (Government)',
        href: 'https://sansols.sarawak.gov.my/panel/',
      },
    ],
    meta: {
      role: 'Front-end engineer',
      year: '2022-2024',
      status: 'ARCHIVED',
      stack: 'Flutter, NodeJS, GraphQL',
    },
    heroDescription:
      'Flutter web and mobile app for Sarawak government to manage Employers for employing Workers and Foreign Workers',
    caseStudy: [
      {
        number: '01',
        title: 'Problem',
        body: [
          'Employer and Sarawak government spend from 6-9 months in order to apply and approve in bringing in Foreign Workers to the State. SANSOLS project aim to cut the time needed to 1-2 weeks instead.',
        ],
      },
      {
        number: '02',
        title: 'Preview',
        media: [
          {
            label: 'Landing Page',
            src: '/assets/portfolios/sansols/sansols-landing.png',
          },
          {
            label: 'Government Home Page',
            src: '/assets/portfolios/sansols/sansols-gov-home-page.png',
          },
        ],
      },
      {
        number: '03',
        title: 'My Contributions',
        body: [
          '- Maintains the GraphQL API clients that has flexible queries and ORM-like pattern. Powered with recursion on fragments for reducing payload amount',
          '- Maintains the CI/CD for development, staging and live builds',
          '- Responsible for the entirety of the project quality',
          '- Delegate code ownership to team members',
          '- Google Map integration with Map Marker and Search function',
          '- Reactive state management with Provider and RxDart',
        ],
      },
      {
        number: '04',
        title: 'Key Decisions',
        body: ['Lorem'],
      },
      {
        number: '05',
        title: 'Trade-offs',
        body: [
          '- This was front-end role only, we have to built the app in Flutter against the API and data model provided by the back-end team',
          '- Introduction of GraphQL bringing flexibility to our API usage, but at the cost of bigger payload due to our team inexperienced in optimising it.',
        ],
      },
      {
        number: '06',
        title: 'Result',
        body: [
          'The project managed to onboard 10 pilot major companies in Sarawak and ultimately was canceled for another vendor',
        ],
      },
      {
        number: '07',
        title: 'What Can Be Improve',
        body: [
          '- Consistent UI behaviors. Some area of UI are not polished due to time constraint',
          '- Multiple code redundancies requires factoring',
        ],
      },
    ],
  },
  {
    slug: 'isc-workflow',
    name: 'iSC Workflow',
    tagline: 'iSarawakCare Workflow',
    fullTitle: 'iSC Workflow',
    description:
      "Web form builder owned by Sarawak state, designed to reduce constraints between state's initiatives and applicants",
    platform: 'Web',
    date: '2020-Present',
    status: 'ONGOING',
    techStack: [
      'Flutter',
      'Dart',
      'Provider',
      'Freezed',
      'CI/CD',
      'Playwright',
    ],
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
  },
  {
    slug: 'my-kampus-radio',
    name: 'MyKampus Radio Unofficial App',
    tagline: 'MyKampus Radio',
    fullTitle: 'MyKampus Radio Unofficial App',
    description:
      'Personal work designed to provide better accessibility on livestream for MyKampus Radio listeners',
    platform: 'Web & Mobile',
    date: '2021',
    status: 'COMPLETED',
    techStack: ['Flutter', 'Dart', 'Provider'],
    logo: '/assets/portfolios/my_kampus_radio/mkr-logo.png',
    screenshots: [
      {
        label: 'Home Page',
        src: '/assets/portfolios/my_kampus_radio/mkr-home.png',
      },
      {
        label: 'Side Navigation',
        src: '/assets/portfolios/my_kampus_radio/mkr-side-panel.png',
      },
      {
        label: 'Mobile Home Page',
        src: '/assets/portfolios/my_kampus_radio/mkr-home-mobile.png',
      },
      {
        label: 'Mobile Side Navigation',
        src: '/assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.png',
      },
    ],
    links: [
      { label: 'Website', href: 'https://mykampusradio.com/' },
      { label: 'Web App', href: 'https://mkr.saifulmashuri.com/' },
      {
        label: 'GitHub',
        href: 'https://github.com/saifymatteo/MKR-Unofficial-App-Flutter',
      },
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.saifymatteo.mkr_flutter',
      },
    ],
    meta: {
      role: 'Developer',
      year: '2021',
      status: 'COMPLETED',
      stack: 'Flutter, Dart',
    },
    heroDescription: descriptionPlaceholder('MyKampus Radio Unofficial App'),
    caseStudy: placeholderCaseStudy('MyKampus Radio Unofficial App'),
    wip: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    ongoing: projects.filter((p) => p.status === 'ONGOING').length,
  };
}
