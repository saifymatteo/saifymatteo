import HomeHero from '@/app/components/home_hero';
import PageHero from '@/app/components/page_hero';
import ProjectCard from '@/app/components/project_card';
import GradientBar from '@/components/gradient_bar';
import Pill from '@/components/pill';
import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import TechStack from '@/app/components/tech_stack';
import { getFeaturedProjects } from '@/lib/projects/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const [sansols, isc, mkr] = getFeaturedProjects();

export default function Home() {
  return (
    <>
      <HomeHero />

      <TechStack />

      {/* Featured Projects */}
      <PageHero className="px-6 py-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row">
            <h2 className="text-5xl font-bold text-white">Projects</h2>
            <Pill>Featured Works</Pill>
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
      </PageHero>

      {/* Contact Card */}
      <section className="pb-24">
        <GradientBar />
        <Reveal className="content-max-width-slim px-6 lg:px-0">
          <div className="gradient-surface mx-auto mt-14 flex w-full max-w-3xl flex-col items-center gap-6 rounded-[20px] px-8 py-12 text-center shadow-lg">
            <ShaderBackdrop />
            <div className="z-content relative flex flex-col items-center gap-6">
              <h2 className="text-5xl font-bold text-white">Interested?</h2>
              <p className="max-w-xl text-base text-white">
                I&#39;m excited to start a new project with you! For business
                inquiries, please contact me.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-2.5 text-xl font-medium text-white transition-all duration-300 hover:bg-white/20 active:scale-95"
              >
                Get in touch{' '}
                <ArrowRight className="button-arrow-slide size-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
