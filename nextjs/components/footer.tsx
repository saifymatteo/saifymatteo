import { AppConstants } from '@/app/constants/constants';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const elsewhere = [
  { label: 'Github', href: AppConstants.CONTACT_GITHUB },
  { label: 'Email', href: `mailto:${AppConstants.CONTACT_EMAIL}` },
  { label: 'LinkedIn', href: AppConstants.CONTACT_LINKEDIN },
  { label: 'Résumé', href: AppConstants.CONTACT_RESUME },
];

export default function Footer() {
  return (
    <footer>
      <div className="gradient-bar h-2" />
      <div className="content-max-width flex flex-col gap-10 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex max-w-90 flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo/logo-dark.webp"
              width={500}
              height={318}
              alt="Saiful Mashuri logo"
              className="flex h-16 w-auto dark:hidden"
            />
            <Image
              src="/assets/logo/logo-light.webp"
              width={500}
              height={318}
              alt="Saiful Mashuri logo"
              className="hidden h-16 w-auto dark:flex"
            />
            <div>
              <p className="text-2xl font-bold">Saiful Mashuri</p>
              <p className="text-2xl">
                <span className="font-bold">s</span>aify
                <span className="font-bold">m</span>atteo
              </p>
            </div>
          </div>
          <p className="text-primary-foreground text-base">
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
                className="text-primary-foreground underline-slide w-fit text-base"
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
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-primary-foreground underline-slide w-fit text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-secondary-foreground content-max-width flex flex-col items-center justify-between gap-2 border-t px-6 py-4 sm:flex-row">
        <p className="text-primary-foreground text-base">
          © 2026 Saiful Mashuri
        </p>
        <p className="text-primary-foreground text-base">
          Design in Penpot and built with NextJS
        </p>
      </div>
    </footer>
  );
}
