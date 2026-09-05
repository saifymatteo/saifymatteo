import type { Project } from '@/lib/projects/projects';
import { getAdjacentProjects } from '@/lib/projects/projects';
import PreviewSection from '@/app/projects/[slug]/components/case_study_preview';
import PageHero from '@/app/components/page_hero';
import FadeImage from '@/app/components/fade_image';
import Reveal from '@/components/reveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Divider = () => (
  <div className="border-secondary-foreground/20 mt-2 border-t" />
);

const formatStack = (stack: string[]) =>
  stack.length > 3 ? `${stack.slice(0, 3).join(' · ')}` : stack.join(' · ');

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <PageHero className="px-6 pt-12 pb-16 sm:pt-16">
      <div className="flex flex-col items-center gap-8 text-center sm:items-center sm:gap-14 lg:flex-row lg:text-left">
        <FadeImage
          src={project.logoDark ? project.logoDark : project.logo}
          width={500}
          height={0}
          alt={`${project.title} logo`}
          className="h-auto w-100 object-contain"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-[26px] font-bold text-white">{project.tagline}</p>
          <p className="max-w-2xl text-base text-white">{project.summary}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 lg:justify-start">
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border-2 border-white px-5 py-2 text-base font-medium text-white transition-colors hover:bg-white/10"
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
            className="rounded-xl border border-white px-4 py-3 backdrop-blur-sm"
          >
            <dt className="text-sm text-white">{label}</dt>
            <dd className="text-base font-bold text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </PageHero>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  // Drop Preview sections with no media so numbering stays contiguous.
  const sections = project.caseStudy.filter(
    (s) =>
      s.title !== 'Preview' || (s.media !== undefined && s.media.length > 0)
  );
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
        {sections.map((section, i) => {
          const number = String(i + 1).padStart(2, '0');
          return (
            <Reveal key={number}>
              {section.title === 'Preview' ? (
                <PreviewSection
                  number={number}
                  title={section.title}
                  media={section.media ?? []}
                />
              ) : (
                <article className="content-max-width-slim px-6">
                  <h2 className="flex items-center gap-3">
                    <span className="text-primary-foreground text-sm font-light">
                      {number}
                    </span>
                    <span className="text-primary-foreground text-3xl font-bold">
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
                              <p className="text-primary-foreground text-base">
                                •
                              </p>
                            )}
                            <p className="text-primary-foreground text-base">
                              {e}
                            </p>
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
                    className={`group border-primary-foreground/20 hover:border-primary-foreground/50 flex flex-col gap-1 rounded-2xl border px-6 py-4 transition-colors ${
                      item.dir === 'Next' ? 'ml-auto' : ''
                    }`}
                  >
                    <span className="text-primary-foreground/60 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                      {item.arrow}
                      {item.dir === 'Next'
                        ? 'Next project'
                        : 'Previous project'}
                    </span>
                    <span className="text-primary-foreground text-lg font-bold group-hover:underline">
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
