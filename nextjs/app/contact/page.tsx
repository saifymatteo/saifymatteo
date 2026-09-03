import ResumeDialog from '@/app/contact/components/resume_dialog';
import ContactForm from '@/app/contact/components/contact_form';
import PageHero from '@/app/components/page_hero';
import GradientBar from '@/components/gradient_bar';
import Reveal from '@/components/reveal';
import { AppConstants } from '@/app/constants/constants';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MoveUpRight, SquareArrowOutUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Saiful Mashuri',
  description: 'Hit me up — Saiful Mashuri is open to any roles and projects.',
};

enum ContactLinkType {
  default,
  viewer,
}

const contacts = [
  {
    label: 'Email',
    value: AppConstants.CONTACT_EMAIL,
    href: `mailto:${AppConstants.CONTACT_EMAIL}`,
    icon: <SquareArrowOutUpRight />,
    type: ContactLinkType.default,
  },
  {
    label: 'Resume',
    value: 'View & Download',
    href: AppConstants.CONTACT_RESUME,
    icon: <MoveUpRight />,
    type: ContactLinkType.viewer,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saifymatteo',
    href: AppConstants.CONTACT_LINKEDIN,
    icon: <SquareArrowOutUpRight />,
    type: ContactLinkType.default,
  },
  {
    label: 'Github',
    value: 'github.com/saifymatteo',
    href: AppConstants.CONTACT_GITHUB,
    icon: <SquareArrowOutUpRight />,
    type: ContactLinkType.default,
  },
];

export default function AppContact() {
  return (
    <>
      <PageHero className="px-6 pt-14 pb-18">
        <h1 className="text-5xl font-bold text-white">Let&#39;s Talk</h1>
        <p className="mt-3 text-lg text-white">
          Hit me up, I&#39;m open to any roles and projects
        </p>
        <Reveal>
          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {contacts.map((contact) =>
              contact.type === ContactLinkType.viewer ? (
                <ResumeDialog
                  key={contact.label}
                  label={contact.label}
                  value={contact.value}
                  icon={contact.icon}
                />
              ) : (
                <Link
                  key={contact.label}
                  href={contact.href}
                  target={
                    contact.href.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    contact.href.startsWith('http') ? 'noreferrer' : undefined
                  }
                  className="group flex flex-row items-center justify-between rounded-2xl border border-white px-6 py-4 backdrop-blur-sm transition-colors"
                >
                  <span className="flex flex-row items-center">
                    <span className="w-20 text-base font-normal text-white">
                      {contact.label}
                    </span>
                    <span className="underline-slide text-xl font-bold text-white">
                      {contact.value}
                    </span>
                  </span>
                  <span className="button-arrow-slide text-white">
                    {contact.icon}
                  </span>
                </Link>
              )
            )}
          </div>
        </Reveal>
      </PageHero>
      <GradientBar />
      <section className="px-6 py-20">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
