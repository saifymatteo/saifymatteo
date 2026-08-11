import ContactCta from '@/components/contact_cta';
import HomeHero from '@/components/home_hero';
import ProjectCard from '@/components/project_card';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import TechStack from '@/components/tech_stack';
import { projects } from '@/lib/projects/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const [sansols, isc, mkr] = projects;

export default function Home() {
  return (
    <>
      <HomeHero />

      <TechStack />

      {/* Featured projects */}
      <section className="gradient-surface px-6 py-20">
        <ShaderBackdrop />
        <div className="content-max-width relative z-10">
          <Reveal>
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-bold text-white">Projects</h2>
              <p className="text-secondary-foreground bg-secondary-background rounded-full px-4 py-1.5 font-mono text-lg font-semibold">
                Featured Works
              </p>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-col gap-6">
            <Reveal>
              <ProjectCard project={sansols} variant="wide" />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <ProjectCard project={isc} variant="narrow" />
              </Reveal>
              <Reveal delay={0.1}>
                <ProjectCard project={mkr} variant="narrow" />
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-14">
            <div className="text-center">
              <Link
                href="/projects"
                className="text-secondary-foreground bg-secondary-background group inline-flex items-center gap-2 rounded-full px-7 py-3 text-xl font-medium shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                View All Projects{' '}
                <ArrowRight className="button-arrow-slide size-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
