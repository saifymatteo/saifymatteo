import ContactCta from '@/components/contact_cta';
import HomeHero from '@/components/home_hero';
import ProjectCard from '@/components/project_card';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import TechStack from '@/components/tech_stack';
import { projects } from '@/lib/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const [sansols, isc, mkr] = projects;

export default function Home() {
  return (
    <>
      <HomeHero />

      <TechStack />

      {/* Featured projects */}
      <section className="from-blue to-blue-light relative overflow-hidden bg-linear-to-r px-6 py-20">
        <ShaderBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-281.5">
          <Reveal>
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-bold text-white">Projects</h2>
              <span className="border-blue/40 text-blue rounded-full border bg-white px-5 py-1.5 text-xl font-semibold dark:border-white/40 dark:bg-[#1f1f1f] dark:text-white">
                Featured Works
              </span>
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
                className="text-blue inline-flex items-center gap-2 rounded-full border border-white/60 bg-white px-7 py-3 text-xl font-medium shadow-md transition-all duration-300 hover:bg-blue-50 active:scale-95 dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#222]"
              >
                View All Projects <ArrowRight className="size-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
