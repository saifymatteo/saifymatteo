import {
  toSectionViews,
  type CaseStudySection,
  type SectionView,
} from './case_study.ts';

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'ARCHIVED';
export type { CaseStudySection };

// What a consumer is allowed to know about a project. `contents` is
// deliberately NOT here — sections are read through `getCaseStudySections`
// (hard seam; TypeScript rejects any other access).
export interface Project {
  slug: string;
  // Projects default to professional work; 'personal' is opt-in.
  category?: 'professional' | 'personal';
  cover?: { label: string; src: string; width: number; height: number };
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
  date?: string;
  status?: ProjectStatus;
  techStack: string[];
  // Case-study hero info card.
  role: string;
  logo?: string;
  logoDark?: string;
  links: { label: string; href: string }[];
}

// What content files supply: a Project plus its raw case-study sections.
export type ProjectContent = Project & { contents: CaseStudySection[] };

// The two display surfaces, crossed with the two project types. Naming:
// project<Type><Display> — Curated = the home page preview, Full = the
// listing and detail surfaces. Order comes from the CMS (`_order`, managed
// by drag-and-drop in the admin list); Curated takes the first slice.
export interface ProjectCatalog {
  // Every published project in order, regardless of category.
  projects: Project[];
  // All projects of each type, in order — the /projects listing sections.
  projectProfessionalFull: Project[];
  projectPersonalFull: Project[];
  // The home page previews: the first three professional projects (one wide
  // card + up to two narrow cards, per the "Featured Works" glossary entry)
  // and the first personal project (the preview tile).
  projectProfessionalCurated: Project[];
  projectPersonalCurated?: Project;
  getProject: (slug: string) => Project | undefined;
  getAdjacentProjects(slug: string): {
    prev: Project | undefined;
    next: Project | undefined;
  };
  // Only expose render-ready sections, never the raw authored sections.
  getCaseStudySections(project: Project): SectionView[];
  projectStats: () => {
    total: number;
    completed: number;
    ongoing: number;
  };
}

// Local corpus files (payloadcms/content/) and CMS responses use the same
// lookups and section invariants.
export function createProjectCatalog(
  content: ProjectContent[]
): ProjectCatalog {
  const projects: Project[] = content;
  const projectProfessionalFull = projects.filter(
    (project) => project.category !== 'personal'
  );
  const projectPersonalFull = projects.filter(
    (project) => project.category === 'personal'
  );

  return {
    projects,
    projectProfessionalFull,
    projectPersonalFull,
    projectProfessionalCurated: projectProfessionalFull.slice(0, 3),
    projectPersonalCurated: projectPersonalFull[0],
    getProject: (slug: string) => projects.find((p) => p.slug === slug),
    getAdjacentProjects(slug: string) {
      const index = projects.findIndex((p) => p.slug === slug);
      return {
        prev: index < 0 ? undefined : projects[index - 1],
        next: index < 0 ? undefined : projects[index + 1],
      };
    },
    // Only expose render-ready sections, never the raw authored sections.
    getCaseStudySections(project: Project): SectionView[] {
      const raw = content.find((c) => c.slug === project.slug)?.contents ?? [];
      return toSectionViews(raw);
    },
    projectStats: () => ({
      total: projects.length,
      completed: projects.filter((p) => p.status === 'COMPLETED').length,
      ongoing: projects.filter((p) => p.status === 'ONGOING').length,
    }),
  };
}
