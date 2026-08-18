import type { Project } from './projects';
import { descriptionPlaceholder, placeholderCaseStudy } from './utils';

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
  logoLight: undefined,
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
  heroDescription: descriptionPlaceholder('MyKampus Radio Unofficial App'),
  caseStudy: placeholderCaseStudy('MyKampus Radio Unofficial App'),
  wip: true,
};
