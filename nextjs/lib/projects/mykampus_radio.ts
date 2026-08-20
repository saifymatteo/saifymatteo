import type { Project } from './projects';

export const projectMyKampusRadio: Project = {
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
  logo: '/assets/portfolios/my_kampus_radio/mkr-logo.webp',
  logoDark: undefined,
  screenshots: [
    {
      label: 'Home Page',
      src: '/assets/portfolios/my_kampus_radio/mkr-home.webp',
    },
    {
      label: 'Side Navigation',
      src: '/assets/portfolios/my_kampus_radio/mkr-side-panel.webp',
    },
    {
      label: 'Mobile Home Page',
      src: '/assets/portfolios/my_kampus_radio/mkr-home-mobile.webp',
    },
    {
      label: 'Mobile Side Navigation',
      src: '/assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.webp',
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
  heroDescription:
    'MyKampus Radio (MKR) is a media platform exclusively for youth, particularly students on college or university campuses. MKR serves as an engaging outlet for entertainment, political awareness, and the promotion of local artists (indie).',
  caseStudy: [
    {
      number: '01',
      title: 'About the App',
      body: [
        '- Designed to be a simple, cross-platform application, ensuring accessibility for a wide range of users.',
        '- Users can listen live to the official MKR online radio, offering a real-time audio experience.',
      ],
    },
    {
      number: '02',
      title: 'Preview',
      media: [
        {
          label: 'Home Page',
          src: '/assets/portfolios/my_kampus_radio/mkr-home.webp',
        },
        {
          label: 'Side Navigation',
          src: '/assets/portfolios/my_kampus_radio/mkr-side-panel.webp',
        },
        {
          label: 'Mobile Home Page',
          src: '/assets/portfolios/my_kampus_radio/mkr-home-mobile.webp',
        },
        {
          label: 'Mobile Side Navigation',
          src: '/assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.webp',
        },
      ],
    },
    {
      number: '03',
      title: 'My Contributions',
      body: [
        '- Solely responsible for the conception, design, and implementation of the MKR app.',
        '- Successfully integrated the MKR online radio into the app, a task that required reverse-engineering skills.',
      ],
    },
  ],
  wip: true,
};
