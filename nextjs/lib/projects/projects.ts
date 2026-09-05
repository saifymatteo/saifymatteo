import {
  toSectionViews,
  type CaseStudySection,
  type SectionView,
} from './case_study.ts';
import { projectIscWorkflow } from './isc_workflow.ts';
import { projectMyKampusRadio } from './mykampus_radio.ts';
import { projectSansols } from './sansols.ts';

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'ARCHIVED';
export type { CaseStudySection };

// What a consumer is allowed to know about a project. `caseStudy` is
// deliberately NOT here — sections are read through `getCaseStudySections`
// (hard seam; TypeScript rejects any other access).
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
}

// What content files supply: a Project plus its raw case-study sections.
export type ProjectContent = Project & { caseStudy: CaseStudySection[] };

const content: ProjectContent[] = [
  projectSansols,
  projectIscWorkflow,
  projectMyKampusRadio,
];

// All projects, in module order. /projects renders everything; the home page
// features the first three via `getFeaturedProjects`.
export const projects: Project[] = content;

// Featured Works rule (CONTEXT.md): the first three projects by module order,
// static max — a 4th project lands on /projects without touching the home page.
export function getFeaturedProjects(): Project[] {
  return content.slice(0, 3);
}

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

// The only public access to a project's case-study sections: render-ready
// views with the Section invariants already applied.
export function getCaseStudySections(project: Project): SectionView[] {
  const raw = content.find((c) => c.slug === project.slug)?.caseStudy ?? [];
  return toSectionViews(raw);
}

export function projectStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    ongoing: projects.filter((p) => p.status === 'ONGOING').length,
  };
}
