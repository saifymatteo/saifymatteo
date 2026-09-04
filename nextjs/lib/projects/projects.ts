import { projectIscWorkflow } from './isc_workflow';
import { projectMyKampusRadio } from './mykampus_radio';
import { projectSansols } from './sansols';

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'ARCHIVED';

export interface CaseStudySection {
  title: string;
  // Paragraphs or bullet points.
  body?: string[];
  // Screenshot captions for the Preview section, with intrinsic dimensions.
  media?: { label: string; src: string; width: number; height: number }[];
}

export interface Project {
  slug: string;
  // Single title, used on cards and the case-study hero.
  title: string;
  // Hero subtitle on the case-study page.
  tagline: string;
  // Brief card body copy, truncated on cards.
  description: string;
  // Full hero paragraph on the case-study page.
  summary: string;
  platform: string;
  // Card meta row and case-study hero info card.
  date: string;
  status: ProjectStatus;
  techStack: string[];
  // Case-study hero info card.
  role: string;
  logo: string;
  logoDark: string | undefined;
  links: { label: string; href: string }[];
  caseStudy: CaseStudySection[];
}

export const projects: Project[] = [
  projectSansols,
  projectIscWorkflow,
  projectMyKampusRadio,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[index - 1],
    next: projects[index + 1],
  };
}

export function projectStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    ongoing: projects.filter((p) => p.status === 'ONGOING').length,
  };
}
