import { Project } from './projects';

export const projectSansols: Project = {
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
  logo: '/assets/portfolios/sansols/sansols-logo.webp',
  logoLight: '/assets/portfolios/sansols/sansols-logo-light.webp',
  screenshots: [
    {
      label: 'Landing Page',
      src: '/assets/portfolios/sansols/sansols-landing.webp',
    },
    {
      label: 'Government Home Page',
      src: '/assets/portfolios/sansols/sansols-gov-home-page.webp',
    },
    {
      label: 'AP Listing Page',
      src: '/assets/portfolios/sansols/sansols-employer-ap-listing.webp',
    },
    {
      label: 'AP Details Page',
      src: '/assets/portfolios/sansols/sansols-employer-ap-details.webp',
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
          src: '/assets/portfolios/sansols/sansols-landing.webp',
        },
        {
          label: 'Government Home Page',
          src: '/assets/portfolios/sansols/sansols-gov-home-page.webp',
        },
        {
          label: 'Employer AP Application Listing Page',
          src: '/assets/portfolios/sansols/sansols-employer-ap-listing.webp',
        },
        {
          label: 'Employer AP Application Detail Page',
          src: '/assets/portfolios/sansols/sansols-employer-ap-details.webp',
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
};
