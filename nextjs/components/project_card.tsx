import type { Project } from '@/lib/projects';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="border-blue/50 text-blue rounded-full border px-3 py-1 text-xs font-bold dark:border-white/40 dark:text-white">
        {project.platform}
      </span>
      <span className="text-ink text-base font-bold dark:text-white">
        {project.date}
      </span>
      <span className="text-grey text-base font-light tracking-widest uppercase dark:text-white">
        {project.status}
      </span>
    </div>
  );
}

function TechTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.techStack.map((tag) => (
        <span
          key={tag}
          className="border-blue/40 text-blue rounded-full border px-2.5 py-0.5 text-[10px] font-light dark:border-white/30 dark:text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="text-blue group inline-flex items-center gap-1 text-base font-bold hover:underline dark:text-white"
    >
      Case Study{' '}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function ProjectCard({
  project,
  variant = 'narrow',
}: {
  project: Project;
  variant?: 'wide' | 'narrow';
}) {
  if (variant === 'wide') {
    return (
      <article className="border-line bg-card rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="grid gap-6 sm:grid-cols-[30%_1fr]">
          <div className="flex min-h-40 items-center justify-center rounded-xl bg-[#0b0b0b] p-6">
            <Image
              src={project.logo}
              width={160}
              height={0}
              alt={`${project.name} logo`}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <MetaRow project={project} />
            <h3 className="text-ink text-[26px] leading-snug font-bold dark:text-white">
              {project.fullTitle}
            </h3>
            <p className="text-ink/80 text-base dark:text-white/80">
              {project.description}
            </p>
            <TechTags project={project} />
            <CaseStudyLink project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border-line bg-card flex flex-col gap-4 rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Image
        src={project.logo}
        width={120}
        height={0}
        alt={`${project.name} logo`}
        className="h-12 w-fit object-contain"
      />
      <MetaRow project={project} />
      <h3 className="text-ink text-[26px] leading-snug font-bold dark:text-white">
        {project.fullTitle}
      </h3>
      <p className="text-ink/80 text-base dark:text-white/80">
        {project.description}
      </p>
      <TechTags project={project} />
      <CaseStudyLink project={project} />
    </article>
  );
}
