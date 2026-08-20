'use client';

import type { Project } from '@/lib/projects/projects';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="border-secondary-foreground text-secondary-foreground rounded-full border px-3 py-1 text-xs font-bold">
        {project.platform}
      </span>
      <span className="text-primary-foreground text-base font-bold">
        {project.date}
      </span>
      <span className="text-primary-foreground text-base font-light tracking-widest uppercase">
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
          className="border-secondary-foreground text-secondary-foreground rounded-full border px-2.5 py-0.5 text-[12px] font-normal"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyLink({ hover }: { hover: boolean }) {
  return (
    <div className={`text-secondary-foreground inline-flex items-center gap-1`}>
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
  const alt = `${project.name} logo`;
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
        <article className="border-primary-foreground bg-primary-background rounded-2xl border p-8 shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="grid gap-6 sm:grid-cols-[30%_1fr]">
            <div className="flex min-h-40 items-center justify-center rounded-xl p-6">
              <ProjectLogo project={project} className="h-auto w-full" />
            </div>
            <div className="flex flex-col items-start gap-3">
              <MetaRow project={project} />
              <h3 className="text-primary-foreground text-[26px] leading-snug font-bold">
                {project.fullTitle}
              </h3>
              <p className="text-primary-foreground text-base">
                {project.description}
              </p>
              <TechTags project={project} />
              <CaseStudyLink hover={hover} />
            </div>
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
      <article className="border-primary-foreground bg-primary-background flex flex-col gap-4 rounded-2xl border p-8 shadow-xl transition-all duration-300 hover:-translate-y-1">
        <ProjectLogo project={project} className="h-40 w-fit" />
        <MetaRow project={project} />
        <h3 className="text-primary-foreground text-[26px] leading-snug font-bold">
          {project.fullTitle}
        </h3>
        <p className="text-primary-foreground text-base">
          {project.description}
        </p>
        <TechTags project={project} />
        <CaseStudyLink hover={hover} />
      </article>
    </Link>
  );
}
