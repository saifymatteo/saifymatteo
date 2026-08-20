import type { Project } from '@/lib/projects/projects';
import PreviewSection from '@/app/projects/[slug]/components/case_study_preview';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="gradient-surface px-6 pt-12 pb-16 sm:pt-16">
      <ShaderBackdrop />
      <div className="content-max-width relative z-10">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-14 sm:text-left">
          <Image
            src={project.logo}
            width={500}
            height={0}
            alt={`${project.name} logo`}
            className="h-auto w-100 object-contain"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-white">{project.name}</h1>
            <p className="text-[26px] font-bold text-white">
              {project.tagline}
            </p>
            <p className="max-w-2xl text-base text-white">
              {project.heroDescription}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4 sm:justify-start">
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
            ['ROLE', project.meta.role],
            ['YEAR', project.meta.year],
            ['STATUS', project.meta.status],
            ['STACK', project.meta.stack],
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
      </div>
    </section>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  return (
    <section className="py-16">
      <div className="flex flex-col gap-12">
        {project.caseStudy.map((section) => (
          <Reveal key={section.number}>
            {section.title === 'Preview' ? (
              <>
                <PreviewSection
                  number={section.number}
                  title={section.title}
                  media={section.media ?? []}
                />
              </>
            ) : (
              <article className="content-max-width-slim px-6">
                <h2 className="flex items-center gap-3">
                  <span className="text-primary-foreground text-sm font-light">
                    {section.number}
                  </span>
                  <span className="text-primary-foreground text-3xl font-bold">
                    {section.title}
                  </span>
                </h2>
                <div className="border-secondary-foreground/20 mt-2 border-t"></div>
                {section.body && (
                  <div className="mt-2 flex flex-col gap-3">
                    {section.body.map((line, i) => (
                      <div key={i}>
                        <p className="text-primary-foreground text-base">
                          {line}
                        </p>
                        <div className="border-secondary-foreground/20 mt-2 border-t"></div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )}
          </Reveal>
        ))}
        {project.wip && (
          <p className="content-max-width-slim border-blue text-secondary-foreground w-fit rounded-full border px-4 py-1.5 text-sm font-medium">
            Draft content — case study pending
          </p>
        )}
      </div>
    </section>
  );
}
