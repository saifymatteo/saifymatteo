import type { PayloadRequest } from 'payload';
import type { Project, Media } from './payload-types';

// Deliberately independent from the frontend package; this is the wire contract.
export type PortfolioImage = {
  label: string;
  src: string;
  width: number;
  height: number;
};
export type PortfolioLink = { label: string; href: string };
export type PortfolioSection = {
  title: string;
  kind?: 'preview' | 'text';
  body?: string[];
  code?: { label: string; source: string }[];
  links?: PortfolioLink[];
  media?: PortfolioImage[];
};
export type ProjectContent = {
  slug: string;
  category?: 'professional' | 'personal';
  title: string;
  tagline: string;
  description: string;
  summary: string;
  platform: string;
  role: string;
  date?: string;
  status?: 'COMPLETED' | 'ONGOING' | 'ARCHIVED';
  techStack: string[];
  logo?: string;
  logoDark?: string;
  cover?: PortfolioImage;
  links: PortfolioLink[];
  contents: PortfolioSection[];
};

// The same loopback host under its other spelling, for CSRF-origin entries.
// Returns the input unchanged for non-loopback (e.g. production) origins.
export function loopbackTwin(origin: string): string {
  const url = new URL(origin);
  if (url.hostname === 'localhost') {
    return `${url.protocol}//127.0.0.1:${url.port}`;
  }
  if (url.hostname === '127.0.0.1') {
    return `${url.protocol}//localhost:${url.port}`;
  }
  return origin;
}

export function serverURL(
  value = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3002'
): string {
  const url = new URL(value);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error(
      'PAYLOAD_PUBLIC_SERVER_URL must be an HTTP(S) origin without credentials, path, query or fragment.'
    );
  }
  return url.origin;
}

function uploaded(value: number | Media | null | undefined): Media {
  if (!value || typeof value !== 'object' || !value.url)
    throw new Error('Missing or unpopulated media relationship.');
  return value;
}
function mediaURL(
  value: number | Media | null | undefined,
  origin: string
): string {
  const media = uploaded(value);
  const url = new URL(media.url!, `${serverURL(origin)}/`);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.origin !== serverURL(origin)
  )
    throw new Error('Media URL must belong to this CMS.');
  return url.href;
}

type Visual = NonNullable<Project['cover']>[number];
function visual(value: Visual, origin: string): PortfolioImage {
  const image = uploaded(value.image);
  const width = value.width ?? image.width;
  const height = value.height ?? image.height;
  if (
    !width ||
    !height ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  )
    throw new Error('Media requires positive intrinsic dimensions.');
  return { label: value.label, src: mediaURL(image, origin), width, height };
}
const links = (values: Project['links']): PortfolioLink[] =>
  (values ?? []).map(({ label, href }) => ({ label, href }));

export function toProjectContent(
  project: Project,
  origin: string,
  { allowDraft = false } = {}
): ProjectContent {
  if (!allowDraft && project._status !== 'published')
    throw new Error('Refusing to expose an unpublished project.');
  return {
    slug: project.slug,
    ...(project.category ? { category: project.category } : {}),
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    summary: project.summary,
    platform: project.platform,
    role: project.role,
    ...(project.date ? { date: project.date } : {}),
    ...(project.status ? { status: project.status } : {}),
    techStack: project.techStack.map(({ name }) => name),
    ...(project.logo ? { logo: mediaURL(project.logo, origin) } : {}),
    ...(project.logoDark
      ? { logoDark: mediaURL(project.logoDark, origin) }
      : {}),
    ...(project.cover?.length
      ? { cover: visual(project.cover[0], origin) }
      : {}),
    links: links(project.links),
    // Raw sections: no ordinals, preview filtering, or render-time transforms.
    contents: project.contents.map((section) => ({
      title: section.title,
      ...(section.kind ? { kind: section.kind } : {}),
      ...(section.body?.length
        ? { body: section.body.map(({ text }) => text) }
        : {}),
      ...(section.code?.length
        ? { code: section.code.map(({ label, source }) => ({ label, source })) }
        : {}),
      ...(section.links?.length ? { links: links(section.links) } : {}),
      ...(section.media?.length
        ? { media: section.media.map((item) => visual(item, origin)) }
        : {}),
    })),
  };
}

export async function portfolioEndpoint(
  req: PayloadRequest
): Promise<Response> {
  const headers = { 'Cache-Control': 'no-store' };
  try {
    const projects: ProjectContent[] = [];
    let page = 1;
    while (true) {
      const result = await req.payload.find({
        collection: 'projects',
        req,
        overrideAccess: false,
        draft: false,
        where: { _status: { equals: 'published' } },
        sort: ['order', 'id'],
        depth: 1,
        limit: 100,
        page,
      });
      projects.push(
        ...result.docs.map((project) => toProjectContent(project, serverURL()))
      );
      if (!result.hasNextPage) break;
      page++;
    }
    return Response.json({ projects }, { headers });
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'Portfolio API failed' });
    return Response.json(
      { error: 'Portfolio content is temporarily unavailable.' },
      { status: 500, headers }
    );
  }
}
