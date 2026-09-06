'use client';

import type { Project } from '@/lib/projects/projects';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="border-accent text-accent rounded-full border px-3 py-1 text-xs font-bold">
        {project.platform}
      </span>
      <span className="text-ink text-base font-bold">{project.date}</span>
      <span className="text-ink text-base font-light tracking-widest uppercase">
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
          className="border-accent text-accent rounded-full border px-2.5 py-0.5 text-[12px] font-normal"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyLink({ hover }: { hover: boolean }) {
  return (
    <div className={`text-accent inline-flex items-center gap-1`}>
      <p
        className={`underline-slide text-base font-bold ${
          hover ? 'active' : ''
        }`}
      >
        Case Study{' '}
      </p>
      <ArrowRight
        className={`button-arrow-slide size-4 ${hover ? 'active' : ''}`}
      />
    </div>
  );
}

function ProjectLogo({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const alt = `${project.title} logo`;
  if (project.logoDark === undefined) {
    return (
      <Image
        src={project.logo}
        width={400}
        height={0}
        alt={alt}
        className={`object-contain ${className}`}
      />
    );
  }
  return (
    <div>
      <Image
        src={project.logo}
        width={400}
        height={0}
        alt={alt}
        className={`block object-contain dark:hidden ${className}`}
      />
      <Image
        src={project.logoDark}
        width={400}
        height={0}
        alt={alt}
        className={`hidden object-contain dark:block ${className}`}
      />
    </div>
  );
}

function CardBody({ project, hover }: { project: Project; hover: boolean }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <MetaRow project={project} />
      <h3 className="text-ink text-[26px] leading-snug font-bold">
        {project.title}
      </h3>
      <p className="text-ink line-clamp-3 text-base">{project.description}</p>
      <TechTags project={project} />
      <CaseStudyLink hover={hover} />
    </div>
  );
}

export default function ProjectCard({
  project,
  variant = 'narrow',
}: {
  project: Project;
  variant?: 'wide' | 'narrow';
}) {
  const [hover, hoverState] = useState(false);

  if (variant === 'wide') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => hoverState(true)}
        onMouseLeave={() => hoverState(false)}
      >
        <article className="border-hairline bg-canvas shadow-card rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1">
          <div className="grid gap-6 sm:grid-cols-[30%_1fr]">
            <div className="flex min-h-40 items-center justify-center rounded-xl p-6">
              <ProjectLogo project={project} className="h-auto w-full" />
            </div>
            <CardBody project={project} hover={hover} />
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => hoverState(true)}
      onMouseLeave={() => hoverState(false)}
    >
      <article className="border-hairline bg-canvas shadow-card flex flex-col gap-4 rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1">
        <ProjectLogo project={project} className="h-40 w-fit" />
        <CardBody project={project} hover={hover} />
      </article>
    </Link>
  );
}
