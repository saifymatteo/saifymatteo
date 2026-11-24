import {
  ContentBody,
  ContentHero,
} from '@/app/projects/[slug]/components/content';
import { fetchCmsPreview, verifyPreviewToken } from '@/lib/projects/cms';
import { createProjectCatalog } from '@/lib/projects/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LivePreviewRefresh from './live_preview_refresh';

// Draft preview for the CMS Live Preview panel. Gated by a short-lived token
// the CMS signs per slug; renders the draft through the same components as
// /projects/[slug]. Never cached, never indexed.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function AppPreviewPage({ params, searchParams }: Props) {
  const [{ slug }, { token }] = await Promise.all([params, searchParams]);
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
  return (
    <>
      <LivePreviewRefresh cmsOrigin={origin} />
      <ContentHero project={project} />
      <div className="gradient-bar h-2" />
      <ContentBody project={project} catalog={catalog} />
    </>
  );
}
