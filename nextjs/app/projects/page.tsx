import ProjectCard from '@/components/project_card';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import { projects, projectStats } from '@/lib/projects';
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
      <section className="from-blue to-blue-light relative overflow-hidden bg-linear-to-r px-6 pt-14 pb-10">
        <ShaderBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-281.5">
          <h1 className="text-5xl font-bold text-white">
            All Projects I&#39;ve Worked
          </h1>
          <p className="mt-3 max-w-3xl text-xl text-white/85">
            These are the projects that I can talk about, what were the
            problems, the trade-offs and the result
          </p>
          <Reveal>
            <div className="mt-10 grid max-w-3xl grid-cols-3 gap-6">
              {statsRow.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-xl border border-white/40 bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="text-sm text-white/70">{stat.label}</span>
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto flex w-full max-w-281.5 flex-col gap-8">
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
