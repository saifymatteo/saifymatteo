import ContactForm from '@/components/contact_form';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import { AppConstants } from '@/app/constants/constants';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact - Saiful Mashuri',
  description: 'Hit me up — Saiful Mashuri is open to any roles and projects.',
};

const contacts = [
  {
    label: 'Email',
    value: AppConstants.CONTACT_EMAIL,
    href: `mailto:${AppConstants.CONTACT_EMAIL}`,
  },
  {
    label: 'Resume',
    value: 'View & Download →',
    href: AppConstants.CONTACT_RESUME,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saifymatteo',
    href: AppConstants.CONTACT_LINKEDIN,
  },
  {
    label: 'Github',
    value: 'github.com/saifymatteo',
    href: AppConstants.CONTACT_GITHUB,
  },
];

export default function AppContact() {
  return (
    <>
      <section className="from-blue to-blue-light relative overflow-hidden bg-linear-to-r px-6 pt-14 pb-12">
        <ShaderBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-281.5">
          <h1 className="text-5xl font-bold text-white">Let&#39;s Talk</h1>
          <p className="mt-3 text-xl text-white/85">
            Hit me up, I&#39;m open to any roles and projects
          </p>
          <Reveal>
            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              {contacts.map((contact) => (
                <Link
                  key={contact.label}
                  href={contact.href}
                  target={
                    contact.href.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    contact.href.startsWith('http') ? 'noreferrer' : undefined
                  }
                  className="flex flex-col gap-1 rounded-full border border-white/50 px-6 py-4 transition-colors hover:bg-white/10"
                >
                  <span className="text-base font-bold text-white">
                    {contact.label}
                  </span>
                  <span className="text-[26px] font-bold text-white">
                    {contact.value}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-6 py-20">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
