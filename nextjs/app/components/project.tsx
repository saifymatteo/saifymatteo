import CodeBlock from '@/components/code_block';
import Reveal from '@/components/reveal';
import type { Project } from '@/lib/projects/projects';
import { getProjectCatalog } from '@/lib/projects/server';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectLogo({
  project,
  onDark = false,
}: {
  project: Project;
  onDark?: boolean;
}) {
  if (!project.logo) return null;

  return (
    <div
      className={`relative w-full rounded-xl ${
        onDark ? 'aspect-2/1 lg:aspect-4/3' : 'aspect-4/3'
      }`}
    >
      <Image
        src={onDark ? (project.logoDark ?? project.logo) : project.logo}
        fill
        sizes="(min-width: 1040px) 500px, (min-width: 768px) 45vw, 100vw"
        alt={`${project.title} logo`}
        // Inline, not the object-contain class: vinext's next/image shim sets
        // an inline `object-fit: cover` on `fill` images, overriding classes.
        style={{ objectFit: 'contain' }}
        className={`p-6 sm:p-8 ${!onDark && project.logoDark ? 'dark:hidden' : ''}`}
      />
      {!onDark && project.logoDark && (
        <Image
          src={project.logoDark}
          fill
          sizes="(min-width: 1040px) 500px, (min-width: 768px) 45vw, 100vw"
          alt={`${project.title} logo`}
          style={{ objectFit: 'contain' }}
          className="hidden p-6 sm:p-8 dark:block"
        />
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  variant = 'narrow',
  linkLabel = 'Read the case study',
}: {
  project: Project;
  variant?: 'wide' | 'narrow';
  linkLabel?: string;
}) {
  const wide = variant === 'wide';

  return (
    <article
      className={`group card-pops-up ${
        wide
          ? 'grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12'
          : 'flex flex-col gap-6'
      }`}
    >
      <div className={`min-w-0 ${wide ? 'md:order-2' : ''}`}>
        {project.category === 'personal' || !project.logo ? (
          <ProjectImageOrCode project={project} />
        ) : (
          <ProjectLogo project={project} />
        )}
      </div>
      <div className="flex min-w-0 flex-col items-start gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="border-accent text-ink text-micro rounded-full border px-3 py-1 font-bold">
            {project.platform}
          </span>
          {project.category !== 'personal' && project.date && (
            <span className="text-caption">{project.date}</span>
          )}
          {project.category !== 'personal' && project.status && (
            <span className="text-caption">
              {project.status.charAt(0) + project.status.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        <h3 className="text-title font-bold">{project.title}</h3>
        <p className="text-ink max-w-xl">{project.description}</p>
        <ul
          aria-label={`${project.title} technologies`}
          className="flex flex-wrap gap-2"
        >
          {project.techStack.map((tag) => (
            <li
              key={tag}
              className="border-accent text-ink text-micro rounded-full border px-2.5 py-0.5"
            >
              {tag}
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Explore ${project.title}`}
          className="text-ink focus-visible:after:outline-accent inline-flex min-h-11 items-center gap-2 rounded-full font-bold after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4"
        >
          <span className="underline-slide">{linkLabel}</span>
          <ArrowRight
            aria-hidden="true"
            className="button-arrow-slide-x size-4 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>
      </div>
    </article>
  );
}

export function ProjectCardPersonal({
  tile,
  projects,
}: {
  tile?: Project;
  projects: Project[];
}) {
  return (
    <div className="card-pops-up grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      {tile && (
        <Reveal className="min-w-0">
          <ProjectImageOrCode project={tile} />
        </Reveal>
      )}
      {/* The Link is a direct child of the relative card so its stretched
          ::after covers the whole card; the per-project links below come
          after it in DOM order and are relative, so they stay clickable. */}
      <Reveal className="min-w-0">
        <Link
          href="/projects#personal"
          className="text-ink focus-visible:outline-accent block after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline focus-visible:outline-offset-8"
        >
          <h2 id="personal-preview-heading" className="text-heading font-bold">
            Beyond client work
          </h2>
          <p className="text-ink mt-4">
            Pi extensions, a Dart package, keyboards I build, and practical
            things I design and 3D print. Tools and objects I make for everyday
            use.
          </p>
        </Link>
        <ul className="relative mt-5 flex flex-col gap-1">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group text-ink focus-visible:outline-accent inline-flex min-h-11 items-center gap-2 rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span className="underline-slide">{project.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="button-arrow-slide-x size-4 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

// Real project photography, or the package's actual Dart API—not a fake logo.
export async function ProjectImageOrCode({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  // Image
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.label}
        width={project.cover.width}
        height={project.cover.height}
        sizes="(min-width: 1040px) 500px, (min-width: 768px) 45vw, 100vw"
        unoptimized
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="bg-parchment aspect-4/3 h-auto w-full rounded-xl object-cover"
      />
    );
  }

  // Code
  const { getCaseStudySections } = await getProjectCatalog();
  const example = getCaseStudySections(project)
    .find((section) => section.code?.length)
    ?.code?.at(-1);
  if (!example) return null;

  return (
    <figure className="border-hairline bg-parchment text-ink w-full min-w-0 rounded-xl border p-5 sm:p-8">
      <figcaption className="text-caption mb-4 font-semibold">
        {example.label}
      </figcaption>
      <CodeBlock
        source={example.source}
        label={`${project.title} code preview`}
      />
    </figure>
  );
}
