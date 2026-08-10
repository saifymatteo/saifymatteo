import type { Project } from '@/lib/projects';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="from-blue to-blue-light relative overflow-hidden bg-linear-to-r px-6 pt-12 pb-16 sm:pt-16">
      <ShaderBackdrop />
      <div className="relative z-10 mx-auto w-full max-w-281.5">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-14 sm:text-left">
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-[#0b0b0b] p-4">
            <Image
              src={project.logo}
              width={128}
              height={0}
              alt={`${project.name} logo`}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-white">{project.name}</h1>
            <p className="text-[26px] font-bold text-white">
              {project.tagline}
            </p>
            <p className="max-w-2xl text-base text-white/85">
              {project.heroDescription}
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-white px-5 py-2 text-base font-medium text-white transition-colors hover:bg-white/10"
                >
                  {link.label} <ArrowRight className="size-4" />
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
              className="rounded-xl border border-white/40 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <dt className="text-sm text-white/70">{label}</dt>
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
    <section className="px-6 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        {project.caseStudy.map((section) => (
          <Reveal key={section.number}>
            <article className="border-blue/30 border-t pt-6">
              <h2 className="flex items-baseline gap-3">
                <span className="text-ink text-[10px] font-light dark:text-white">
                  {section.number}
                </span>
                <span className="text-ink text-3xl font-bold dark:text-white">
                  {section.title}
                </span>
              </h2>
              {section.body && (
                <div className="mt-4 flex flex-col gap-3">
                  {section.body.map((line, i) => (
                    <p key={i} className="text-ink text-base dark:text-white">
                      {line}
                    </p>
                  ))}
                </div>
              )}
              {section.media && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {section.media.length > 0 ? (
                    section.media.map((m) => (
                      <figure key={m.label} className="flex flex-col gap-2">
                        <Image
                          src={m.src}
                          width={640}
                          height={0}
                          alt={m.label}
                          className="border-line h-auto w-full rounded-xl border object-cover"
                        />
                        <figcaption className="text-ink/70 text-sm dark:text-white/70">
                          {m.label}
                        </figcaption>
                      </figure>
                    ))
                  ) : (
                    <div className="border-line h-40 rounded-xl border border-dashed sm:col-span-2" />
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
        {project.wip && (
          <p className="border-blue/40 text-blue w-fit rounded-full border px-4 py-1.5 text-sm font-medium dark:text-white">
            Draft content — case study pending
          </p>
        )}
      </div>
    </section>
  );
}
