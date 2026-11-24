import PageHero from '@/app/components/page_hero';
import GradientBar from '@/components/gradient_bar';
import Reveal from '@/components/reveal';
import { getProjectCatalog } from '@/lib/projects/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ProjectCard } from '../components/project';
import { ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects - Saiful Mashuri',
  description:
    'Professional software, open-source tooling, custom keyboards, and practical CAD projects by Saiful Mashuri.',
};

export default async function AppProjectsPage() {
  const { projectProfessionalFull, projectPersonalFull, projectStats } =
    await getProjectCatalog();
  const stats = projectStats();
  const statsRow = [
    { label: 'Total', value: stats.total },
    { label: 'Work', value: projectProfessionalFull.length },
    { label: 'Personal', value: projectPersonalFull.length },
  ];

  return (
    <>
      <PageHero className="px-6 pt-14 pb-10">
        <h1 className="text-on-dark text-5xl font-bold">Projects</h1>
        <p className="text-on-dark mt-3 max-w-3xl text-xl">
          Professional work and personal projects: the problems, the decisions,
          and the things I made.
        </p>
        <nav
          aria-label="Project sections"
          className="mt-6 flex flex-wrap gap-6"
        >
          <Link
            href="#professional"
            className="group border-on-dark text-on-dark focus-visible:outline-on-dark inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-semibold transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-95 motion-reduce:transition-none"
          >
            Professional work
            <ArrowDown
              aria-hidden="true"
              className="button-arrow-slide-y size-4 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
            />
          </Link>
          <Link
            href="#personal"
            className="group border-on-dark text-on-dark focus-visible:outline-on-dark inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-semibold transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-95 motion-reduce:transition-none"
          >
            Personal projects
            <ArrowDown
              aria-hidden="true"
              className="button-arrow-slide-y size-4 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
            />
          </Link>
        </nav>
        <Reveal>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:gap-6">
            {statsRow.map((stat) => (
              <div
                key={stat.label}
                className="border-on-dark flex min-w-0 flex-col gap-1 rounded-xl border px-3 py-3 sm:px-4"
              >
                <span className="text-on-dark text-sm">{stat.label}</span>
                <span className="text-on-dark text-2xl font-bold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </PageHero>

      <GradientBar />

      {/* Professional Projects */}
      <section
        id="professional"
        aria-labelledby="professional-heading"
        className="scroll-mt-20 px-6 py-20 sm:py-24"
      >
        <div className="content-max-width">
          <h2 id="professional-heading" className="text-heading font-bold">
            Professional work
          </h2>
          <p className="text-ink mt-4 max-w-2xl">
            Apps I built with teams for clients and government services, and
            what I owned in each.
          </p>
          {projectProfessionalFull.length === 0 ? (
            <p className="text-ink/70 mt-10 text-lg">
              No published professional projects yet — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {projectProfessionalFull.map((project, i) => (
                <Reveal
                  key={project.slug}
                  delay={i * 0.05}
                  className={i === 0 ? 'min-w-0 md:col-span-2' : 'min-w-0'}
                >
                  <ProjectCard
                    project={project}
                    variant={i === 0 ? 'wide' : 'narrow'}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Personal Projects */}
      <section
        id="personal"
        aria-labelledby="personal-heading"
        className="bg-parchment scroll-mt-20 px-6 py-20 sm:py-24"
      >
        <div className="content-max-width">
          <Reveal>
            <h2 id="personal-heading" className="text-heading font-bold">
              Personal projects
            </h2>
            <p className="text-ink mt-4 max-w-2xl">
              Software and physical things I build to learn, solve everyday
              problems, and share what I make.
            </p>
          </Reveal>
          {projectPersonalFull.length === 0 ? (
            <p className="text-ink/70 mt-10 text-lg">
              No published personal projects yet — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {projectPersonalFull.map((project, index) => (
                <Reveal
                  key={project.slug}
                  className={index === 0 ? 'min-w-0 md:col-span-2' : 'min-w-0'}
                >
                  <ProjectCard
                    project={project}
                    variant={index === 0 ? 'wide' : 'narrow'}
                    linkLabel={
                      index === 0
                        ? 'Read the case study'
                        : 'Explore the collection'
                    }
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
