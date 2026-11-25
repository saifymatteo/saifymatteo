import { ProjectCard, ProjectCardPersonal } from '@/app/components/project';
import PageHero from '@/app/components/page_hero';
import {
  ContentBody,
  ContentHero,
} from '@/app/projects/[slug]/components/content';
import { fetchCmsPreview, verifyPreviewToken } from '@/lib/projects/cms';
import {
  createProjectCatalog,
  type Project,
  type ProjectCatalog,
} from '@/lib/projects/projects';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LivePreviewRefresh from './live_preview_refresh';

// Draft preview for the CMS Live Preview panel, one view at a time: the
// project page or each card the draft appears as. Gated by a short-lived
// token the CMS signs per slug; renders through the site's real components.
// Never cached, never indexed.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

const VIEWS = {
  page: 'Page',
  wide: 'Wide card',
  narrow: 'Narrow card',
  personal: 'Home: personal',
} as const;
type View = keyof typeof VIEWS;

const viewsFor = (project: Project): View[] =>
  project.category === 'personal'
    ? ['page', 'wide', 'narrow', 'personal']
    : ['page', 'wide', 'narrow'];

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string; view?: string }>;
}

export default async function AppPreviewPage({ params, searchParams }: Props) {
  const [{ slug }, { token, view: requested }] = await Promise.all([
    params,
    searchParams,
  ]);
  const secret = process.env.PAYLOAD_PREVIEW_SECRET?.trim();
  const origin = process.env.PAYLOAD_CMS_URL?.trim();
  if (
    !secret ||
    !origin ||
    !token ||
    !(await verifyPreviewToken(slug, token, secret))
  )
    notFound();

  let content;
  try {
    content = await fetchCmsPreview(origin, slug, secret);
  } catch (error) {
    return (
      <>
        <LivePreviewRefresh cmsOrigin={origin} />
        <section className="content-max-width-slim px-6 py-24">
          <h1 className="text-heading font-bold">Preview not ready</h1>
          <p className="text-ink mt-4">
            This draft can’t be rendered yet:{' '}
            {error instanceof Error ? error.message : 'unknown error'}. Fill in
            the missing fields; the preview refreshes on the next autosave.
          </p>
        </section>
      </>
    );
  }
  const catalog = createProjectCatalog([content]);
  const project = catalog.getProject(slug)!;
  const views = viewsFor(project);
  const view = views.find((v) => v === requested) ?? 'page';
  const href = (v: View) =>
    `/preview/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}&view=${v}`;

  return (
    <>
      <LivePreviewRefresh cmsOrigin={origin} />
      <nav
        aria-label="Preview view"
        className="bg-parchment border-hairline sticky top-0 z-50 flex flex-wrap items-center gap-2 border-b px-4 py-2"
      >
        <span className="text-caption text-ink-muted mr-2 font-semibold">
          Draft preview
        </span>
        {views.map((v) => (
          <Link
            key={v}
            href={href(v)}
            aria-current={v === view ? 'page' : undefined}
            className={`text-micro rounded-full border px-3 py-1 font-bold ${
              v === view
                ? 'border-accent bg-accent text-on-dark'
                : 'border-accent text-ink'
            }`}
          >
            {VIEWS[v]}
          </Link>
        ))}
      </nav>
      <PreviewView view={view} project={project} catalog={catalog} />
    </>
  );
}

// Each card sits in the same wrapper/section it gets on the real pages so
// widths, backgrounds and grid placement match.
function PreviewView({
  view,
  project,
  catalog,
}: {
  view: View;
  project: Project;
  catalog: ProjectCatalog;
}) {
  const personal = project.category === 'personal';
  if (view === 'page')
    return (
      <>
        <ContentHero project={project} catalog={catalog} />
        <div className="gradient-bar h-2" />
        <ContentBody project={project} catalog={catalog} />
      </>
    );
  if (view === 'personal')
    return (
      // Home page: personal tile under the dark Projects hero.
      <PageHero className="px-6 py-20">
        <ProjectCardPersonal
          tile={project}
          projects={[project]}
          catalog={catalog}
        />
      </PageHero>
    );
  // /projects: first card spans both columns (wide), the rest are narrow.
  const card = (
    <ProjectCard
      project={project}
      variant={view}
      catalog={catalog}
      linkLabel={
        personal && view === 'narrow'
          ? 'Explore the collection'
          : 'Read the case study'
      }
    />
  );
  return (
    <section
      className={`px-6 py-20 sm:py-24 ${personal ? 'bg-parchment' : ''}`}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className={view === 'wide' ? 'min-w-0 md:col-span-2' : 'min-w-0'}
          >
            {card}
          </div>
        </div>
      </div>
    </section>
  );
}
