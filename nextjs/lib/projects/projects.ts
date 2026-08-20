import { projectIscWorkflow } from './isc_workflow';
import { projectMyKampusRadio } from './mykampus_radio';
import { projectSansols } from './sansols';

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'ARCHIVED';

export interface CaseStudySection {
  number: string;
  title: string;
  // Paragraphs or bullet points.
  body?: string[];
  // Screenshot captions for the Preview section.
  media?: { label: string; src: string }[];
}

export interface Project {
  slug: string;
  // Hero title on the case-study page.
  name: string;
  // Hero subtitle on the case-study page.
  tagline: string;
  // Card title on Home/Projects pages.
  fullTitle: string;
  // Card body copy.
  description: string;
  platform: string;
  // Card meta row.
  date: string;
  status: ProjectStatus;
  techStack: string[];
  logo: string;
  logoDark: string | undefined;
  screenshots: { label: string; src: string }[];
  links: { label: string; href: string }[];
  // Info cards on the case-study hero.
  meta: { role: string; year: string; status: string; stack: string };
  // Case-study hero description.
  heroDescription: string;
  caseStudy: CaseStudySection[];
  // True while case-study copy is placeholder.
  wip?: boolean;
}

export const projects: Project[] = [
  projectSansols,
  projectIscWorkflow,
  projectMyKampusRadio,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    ongoing: projects.filter((p) => p.status === 'ONGOING').length,
  };
}
