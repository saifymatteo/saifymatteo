import type { ProjectContent } from './projects';

export const projectSansols: ProjectContent = {
  slug: 'sansols',
  title: 'SANSOLS',
  tagline: 'Sarawak & Non-Sarawakian Labour System',
  description:
    'Sarawak state owned labour system app designed to drastically reduce the processing time for handling Workers, Foreign Workers and Expats',
  summary:
    'Flutter web and mobile app for Sarawak state government to manage Employers applications (Approval in Principle, License Permit, e-VDR and PLKS) for employing Workers, Foreign Workers and Expats',
  platform: 'Web & Mobile',
  date: '2022-2025',
  status: 'COMPLETED',
  techStack: [
    'Flutter',
    'NodeJS',
    'GraphQL',
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
  logoDark: '/assets/portfolios/sansols/sansols-logo-light.webp',
  links: [
    { label: 'Web App (Employer)', href: 'https://sansols.sarawak.gov.my/' },
    {
      label: 'Web App (Government)',
      href: 'https://sansols.sarawak.gov.my/panel/',
    },
  ],
  role: 'Front-end engineer',
  caseStudy: [
    {
      title: 'Problem',
      body: [
        'Employer and Sarawak government spend from 6-9 months in order to apply and approve in bringing in Foreign Workers to the State. SANSOLS project aim to cut the time needed to 1-2 weeks instead.',
      ],
    },
    {
      title: 'Preview',
      kind: 'preview',
      media: [
        {
          label: 'Government Landing',
          src: '/assets/portfolios/sansols/sansols-gov-landing-page.webp',
          width: 1647,
          height: 942,
        },
        {
          label: 'Government AP Processing',
          src: '/assets/portfolios/sansols/sansols-gov-ap-processing.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Government AP Summary',
          src: '/assets/portfolios/sansols/sansols-gov-ap-summary.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Government eVDR and PLKS Processing',
          src: '/assets/portfolios/sansols/sansols-gov-evdr-plks-processing.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Government License Processing',
          src: '/assets/portfolios/sansols/sansols-gov-license-processing.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Employer AP Listing',
          src: '/assets/portfolios/sansols/sansols-employer-ap-listing.webp',
          width: 1647,
          height: 942,
        },
        {
          label: 'Employer AP Details',
          src: '/assets/portfolios/sansols/sansols-employer-ap-details.webp',
          width: 1647,
          height: 942,
        },
        {
          label: 'Employer Apply AP',
          src: '/assets/portfolios/sansols/sansols-employer-apply-ap.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Employer Apply eVDR and PLKS',
          src: '/assets/portfolios/sansols/sansols-employer-apply-evdr-plks.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Employer Apply License | NRE Details',
          src: '/assets/portfolios/sansols/sansols-employer-apply-license-nre-details.webp',
          width: 1534,
          height: 873,
        },
        {
          label: 'Employer License Payment Pending',
          src: '/assets/portfolios/sansols/sansols-employer-license-payment-pending.webp',
          width: 1534,
          height: 873,
        },
      ],
    },
    {
      title: 'My Contributions',
      body: [
        'Maintains the GraphQL API clients that has flexible queries and ORM-like pattern. Powered with recursion on fragments for reducing payload amount',
        'Maintains the CI/CD for development, staging and live builds',
        'Responsible for the entirety of the project quality',
        'Delegate code ownership to team members',
        'Google Map integration with Map Marker and Search function',
        'Reactive state management with Provider and RxDart',
      ],
    },
    {
      title: 'Trade-offs',
      body: [
        'This was front-end role only, we have to built the app in Flutter against the API and data model provided by the back-end team',
        'Introduction of GraphQL bringing flexibility to our API usage, but at the cost of bigger payload due to our team inexperienced in optimising it.',
      ],
    },
    {
      title: 'Result',
      body: [
        'The project managed to onboard 10 pilot major companies in Sarawak and ultimately was canceled for another vendor',
      ],
    },
    {
      title: 'What Can Be Improve',
      body: [
        'Consistent UI behaviors. Some area of UI are not polished due to time constraint',
        'Multiple code redundancies requires factoring',
      ],
    },
  ],
};
