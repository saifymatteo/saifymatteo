import ProjectCard from '@/app/components/project_card';
import PageHero from '@/app/components/page_hero';
import GradientBar from '@/components/gradient_bar';
import Reveal from '@/components/reveal';
import { projects, projectStats } from '@/lib/projects/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Saiful Mashuri',
  description:
    'Projects that Saiful Mashuri can talk about — the problems, the trade-offs and the result.',
};

export default function AppProjectsPage() {
  const stats = projectStats();
  const statsRow = [
    { label: 'PROJECTS', value: stats.total },
    { label: 'COMPLETED', value: stats.completed },
    { label: 'ONGOING', value: stats.ongoing },
  ];

  return (
    <>
      <PageHero className="px-6 pt-14 pb-10">
        <h1 className="text-5xl font-bold text-white">
          All Projects I&#39;ve Worked
        </h1>
        <p className="mt-3 max-w-3xl text-xl text-white">
          These are the projects that I can talk about, what were the problems,
          the trade-offs and the result
        </p>
        <Reveal>
          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-6">
            {statsRow.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 rounded-xl border border-white px-4 py-3 backdrop-blur-sm"
              >
                <span className="text-sm text-white">{stat.label}</span>
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </PageHero>
      <GradientBar />
      <section className="px-6 py-16">
        <div className="content-max-width-slim flex flex-col gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} variant="wide" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
