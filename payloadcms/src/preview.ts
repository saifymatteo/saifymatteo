import { createHmac, timingSafeEqual } from 'node:crypto';
import type { CollectionConfig, PayloadRequest } from 'payload';
import { serverURL, toProjectContent } from './portfolio';

// Live preview: the editor's iframe loads the portfolio's /preview/<slug>
// with a short-lived token bound to the slug. The portfolio verifies the
// token, then fetches the draft from previewEndpoint with the shared secret.
// The token alone never reveals drafts; the secret never leaves the servers.
const TOKEN_SECONDS = 60 * 60;

const previewSecret = () => {
  const secret = process.env.PAYLOAD_PREVIEW_SECRET;
  return secret && secret.length >= 32 ? secret : undefined;
};

export function signPreviewToken(
  slug: string,
  secret: string,
  now = Date.now()
): string {
  const expires = Math.floor(now / 1000) + TOKEN_SECONDS;
  const mac = createHmac('sha256', secret)
    .update(`${slug}.${expires}`)
    .digest('hex');
  return `${expires}.${mac}`;
}

export function portfolioOrigin(
  value = process.env.PORTFOLIO_PREVIEW_ORIGIN ?? 'http://localhost:5173'
): string {
  return new URL(value).origin;
}

export const livePreview: NonNullable<CollectionConfig['admin']>['livePreview'] =
  {
    url: ({ data }) => {
      const secret = previewSecret();
      const slug = typeof data?.slug === 'string' ? data.slug : '';
      if (!secret || !slug) return '';
      const token = signPreviewToken(slug, secret);
      return `${portfolioOrigin()}/preview/${encodeURIComponent(slug)}?token=${token}`;
    },
    breakpoints: [
      { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
      { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
    ],
  };

function secretMatches(given: string | null, secret: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

// GET /api/portfolio-preview?slug=…  (header X-Preview-Secret)
export async function previewEndpoint(req: PayloadRequest): Promise<Response> {
  const headers = { 'Cache-Control': 'no-store' };
  const secret = previewSecret();
  if (!secret || !secretMatches(req.headers.get('x-preview-secret'), secret))
    return Response.json({ error: 'Forbidden' }, { status: 403, headers });
  const slug = new URL(req.url ?? '', 'http://x').searchParams.get('slug');
  if (!slug)
    return Response.json({ error: 'slug required' }, { status: 400, headers });
  try {
    const result = await req.payload.find({
      collection: 'projects',
      draft: true,
      overrideAccess: true,
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    });
    const doc = result.docs[0];
    if (!doc)
      return Response.json({ error: 'Not found' }, { status: 404, headers });
    return Response.json(
      { project: toProjectContent(doc, serverURL(), { allowDraft: true }) },
      { headers }
    );
  } catch (error) {
    // Incomplete drafts (e.g. a section without media) fail validation here.
    req.payload.logger.warn({ err: error, msg: 'Preview render failed' });
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Draft cannot be previewed',
      },
      { status: 422, headers }
    );
  }
}
