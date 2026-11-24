import {
  ContentBody,
  ContentHero,
} from '@/app/projects/[slug]/components/content';
import { getProjectCatalog } from '@/lib/projects/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Strict CMS mode: project routes render on demand, including newly
  // published slugs. Builds never fetch the CMS; with the CMS down they
  // simply produce no static params.
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { getProject } = await getProjectCatalog();
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} - Saiful Mashuri`,
    description: project.summary,
  };
}

export default async function AppIndividualProjectPage({ params }: Props) {
  const { slug } = await params;
  const { getProject } = await getProjectCatalog();
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ContentHero project={project} />
      <div className="gradient-bar h-2" />
      <ContentBody project={project} />
    </>
  );
}
