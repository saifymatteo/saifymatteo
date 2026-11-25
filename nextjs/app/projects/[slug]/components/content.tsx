import type { Project, ProjectCatalog } from '@/lib/projects/projects';
import { getProjectCatalog } from '@/lib/projects/server';
import PreviewSection from '@/app/projects/[slug]/components/content_preview';
import PageHero from '@/app/components/page_hero';
import { ProjectImageOrCode, ProjectLogo } from '@/app/components/project';
import Reveal from '@/components/reveal';
import CodeBlock from '@/components/code_block';
import InlineText from '@/components/inline_text';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Divider = () => <div className="border-accent/20 mt-2 border-t" />;

const formatStack = (stack: string[]) =>
  stack.length > 3 ? `${stack.slice(0, 3).join(' · ')}` : stack.join(' · ');

export function ContentHero({
  project,
  catalog,
}: {
  project: Project;
  catalog?: ProjectCatalog;
}) {
  const personal = project.category === 'personal';
  const metadata = [
    ['Role', project.role],
    ['Year', project.date],
    ['Status', project.status],
    ['Stack', formatStack(project.techStack)],
  ];

  return (
    <PageHero className="px-6 pt-10 pb-16 sm:pt-14">
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex min-w-0 flex-col gap-8">
          <Link
            href={`/projects#${personal ? 'personal' : 'professional'}`}
            className="group text-on-dark focus-visible:outline-on-dark inline-flex items-center gap-2 self-start rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="underline-slide">
              {personal ? 'Personal projects' : 'Professional work'}
            </span>
          </Link>
          <div>
            <h1 className="text-on-dark text-heading sm:text-display font-bold">
              {project.title}
            </h1>
            <p className="text-on-dark sm:text-title mt-4 text-2xl font-bold">
              {project.tagline}
            </p>
            <p className="text-on-dark mt-5">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
              {project.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-on-dark text-on-dark focus-visible:outline-on-dark inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-semibold transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-95 motion-reduce:transition-none"
                >
                  {link.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="button-arrow-slide-x size-4 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {personal ? (
          <ProjectImageOrCode project={project} catalog={catalog} priority />
        ) : (
          <ProjectLogo project={project} onDark />
        )}
      </div>
      <dl
        className={`mt-12 grid gap-4 sm:grid-cols-2 ${personal ? '' : 'lg:grid-cols-4'}`}
      >
        {metadata
          .filter(([, value]) => value)
          .map(([label, value]) => (
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

export async function ContentBody({
  project,
  catalog,
}: {
  project: Project;
  // Injected by the draft preview route; defaults to the published catalog.
  catalog?: ProjectCatalog;
}) {
  const { getAdjacentProjects, getCaseStudySections } =
    catalog ?? (await getProjectCatalog());
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
        {sections.map((section) => (
          <Reveal key={section.ordinal}>
            {section.kind === 'preview' && project.category !== 'personal' ? (
              <PreviewSection
                number={section.ordinal}
                title={section.title}
                media={section.media ?? []}
              />
            ) : (
              <article className="content-max-width-slim px-6">
                <h2 className="text-heading flex items-center gap-3 font-bold">
                  <span className="text-ink text-sm font-light">
                    {section.ordinal}
                  </span>
                  <span>{section.title}</span>
                </h2>
                <Divider />
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="text-ink mt-5">
                    <InlineText text={paragraph} />
                  </p>
                ))}
                {section.code && (
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {section.code.map((example) => (
                      <figure
                        key={example.label}
                        className="border-hairline bg-parchment min-w-0 rounded-2xl border p-5 sm:p-8"
                      >
                        <figcaption className="text-body mb-4 font-semibold">
                          {example.label}
                        </figcaption>
                        <CodeBlock
                          source={example.source}
                          label={`${example.label} code example`}
                        />
                      </figure>
                    ))}
                  </div>
                )}
                {section.media && section.media.length > 0 && (
                  <div className="mt-8">
                    <PreviewSection
                      number={section.ordinal}
                      title={section.title}
                      media={section.media}
                      layout="grid"
                    />
                  </div>
                )}
                {section.links && (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group text-ink focus-visible:outline-accent inline-flex min-h-11 items-center gap-2 rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <span className="underline-slide">{link.label}</span>
                        <ArrowRight
                          aria-hidden="true"
                          className="button-arrow-slide-x size-4 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            )}
          </Reveal>
        ))}
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
                    <span className="text-caption text-ink-muted flex items-center gap-2">
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
