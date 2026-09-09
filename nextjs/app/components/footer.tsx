import { AppConstants } from '@/app/constants/constants';
import BrandLogo from '@/app/components/brand_logo';
import GradientBar from '@/components/gradient_bar';
import TrackedLink from '@/components/tracked_link';
import Link from 'next/link';

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

// Contact CTAs tracked in GA4 — event schema documented in docs/adr/0010.
const elsewhere: {
  label: string;
  href: string;
  gaEvent: string;
  gaParams: Record<string, string>;
}[] = [
  {
    label: 'Github',
    href: AppConstants.CONTACT_GITHUB,
    gaEvent: 'contact_click',
    gaParams: { method: 'github', location: 'footer' },
  },
  {
    label: 'Email',
    href: `mailto:${AppConstants.CONTACT_EMAIL}`,
    gaEvent: 'contact_click',
    gaParams: { method: 'email', location: 'footer' },
  },
  {
    label: 'LinkedIn',
    href: AppConstants.CONTACT_LINKEDIN,
    gaEvent: 'contact_click',
    gaParams: { method: 'linkedin', location: 'footer' },
  },
  {
    label: 'Résumé',
    href: AppConstants.CONTACT_RESUME,
    gaEvent: 'resume_download',
    gaParams: { location: 'footer' },
  },
];

export default function Footer() {
  return (
    <footer>
      <GradientBar />
      <div className="content-max-width flex flex-col gap-10 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex max-w-90 flex-col gap-3">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-16" alt="Saiful Mashuri logo" />
            <div>
              <p className="text-2xl font-bold">Saiful Mashuri</p>
              <p className="text-2xl">
                <span className="font-bold">s</span>aify
                <span className="font-bold">m</span>atteo
              </p>
            </div>
          </div>
          <p className="text-ink text-base">
            Making software that matters with highest standards
          </p>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-24">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-light tracking-widest uppercase">
              LINKS
            </p>
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-ink underline-slide w-fit text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <p className="col-span-2 text-sm font-light tracking-widest uppercase">
              ELSEWHERE
            </p>
            {elsewhere.map((link) => (
              <TrackedLink
                key={link.label}
                gaEvent={link.gaEvent}
                gaParams={link.gaParams}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-ink underline-slide w-fit text-base"
              >
                {link.label}
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
      <div className="border-accent/20 content-max-width flex flex-col items-center justify-between gap-2 border-t px-6 py-4 sm:flex-row">
        <p className="text-ink text-base">© 2026 Saiful Mashuri</p>
        <p className="text-ink text-base">
          Design in Penpot and built with NextJS
        </p>
      </div>
    </footer>
  );
}
