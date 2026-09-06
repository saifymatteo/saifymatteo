import type { Project } from '@/lib/projects/projects';
import {
  getAdjacentProjects,
  getCaseStudySections,
} from '@/lib/projects/projects';
import PreviewSection from '@/app/projects/[slug]/components/case_study_preview';
import PageHero from '@/app/components/page_hero';
import Reveal from '@/components/reveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Divider = () => <div className="border-accent/20 mt-2 border-t" />;

const formatStack = (stack: string[]) =>
  stack.length > 3 ? `${stack.slice(0, 3).join(' · ')}` : stack.join(' · ');

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <PageHero className="px-6 pt-12 pb-16 sm:pt-16">
      <div className="flex flex-col items-center gap-8 text-center sm:items-center sm:gap-14 lg:flex-row lg:text-left">
        <Image
          src={project.logoDark ? project.logoDark : project.logo}
          width={500}
          height={0}
          alt={`${project.title} logo`}
          className="h-auto w-100 object-contain"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-on-dark text-5xl font-bold">{project.title}</h1>
          <p className="text-on-dark text-[26px] font-bold">
            {project.tagline}
          </p>
          <p className="text-on-dark max-w-2xl text-base">{project.summary}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 lg:justify-start">
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group border-on-dark text-on-dark hover:bg-on-dark/10 inline-flex items-center gap-1.5 rounded-full border-2 px-5 py-2 text-base font-semibold transition-colors"
              >
                {link.label}{' '}
                <ArrowRight className="button-arrow-slide size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['ROLE', project.role],
          ['YEAR', project.date],
          ['STATUS', project.status],
          ['STACK', formatStack(project.techStack)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="border-on-dark rounded-xl border px-4 py-3 backdrop-blur-sm"
          >
            <dt className="text-on-dark text-sm">{label}</dt>
            <dd className="text-on-dark text-base font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </PageHero>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const sections = getCaseStudySections(project);
  const nav = [
    prev && {
      href: `/projects/${prev.slug}`,
      dir: 'Prev' as const,
      arrow: <ArrowLeft className="size-5" />,
      name: prev.title,
    },
    next && {
      href: `/projects/${next.slug}`,
      dir: 'Next' as const,
      arrow: <ArrowRight className="size-5" />,
      name: next.title,
    },
  ].filter(Boolean);

  return (
    <section className="py-16">
      <div className="flex flex-col gap-12">
        {sections.map((section) => {
          const number = section.ordinal;
          return (
            <Reveal key={number}>
              {section.kind === 'preview' ? (
                <PreviewSection
                  number={number}
                  title={section.title}
                  media={section.media ?? []}
                />
              ) : (
                <article className="content-max-width-slim px-6">
                  <h2 className="flex items-center gap-3">
                    <span className="text-ink text-sm font-light">
                      {number}
                    </span>
                    <span className="text-ink text-3xl font-bold">
                      {section.title}
                    </span>
                  </h2>
                  <Divider />
                  {section.body && (
                    <div className="mt-2 flex flex-col gap-3">
                      {section.body.map((e, index) => (
                        <div key={index}>
                          <div className="flex flex-row gap-2">
                            {section.body!.length > 1 && (
                              <p className="text-ink text-base">•</p>
                            )}
                            <p className="text-ink text-base">{e}</p>
                          </div>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              )}
            </Reveal>
          );
        })}
        {nav.length > 0 && (
          <nav className="content-max-width-slim flex flex-wrap justify-between gap-3 px-6 pt-4">
            {nav.map(
              (item) =>
                item && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group border-ink/20 hover:border-ink/50 flex flex-col gap-1 rounded-2xl border px-6 py-4 transition-colors ${
                      item.dir === 'Next' ? 'ml-auto' : ''
                    }`}
                  >
                    <span className="text-ink/60 flex items-center gap-2 text-xs font-light tracking-wide uppercase">
                      {item.arrow}
                      {item.dir === 'Next'
                        ? 'Next project'
                        : 'Previous project'}
                    </span>
                    <span className="text-ink text-lg font-bold group-hover:underline">
                      {item.name}
                    </span>
                  </Link>
                )
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
