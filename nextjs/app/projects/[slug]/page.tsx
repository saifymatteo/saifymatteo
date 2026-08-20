import {
  CaseStudyBody,
  CaseStudyHero,
} from '@/app/projects/[slug]/components/case_study';
import { getProject, projects } from '@/lib/projects/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.fullTitle} - Saiful Mashuri`,
    description: project.description,
  };
}

export default async function AppIndividualProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyHero project={project} />
      <div className="gradient-bar h-2" />
      <CaseStudyBody project={project} />
    </>
  );
}
