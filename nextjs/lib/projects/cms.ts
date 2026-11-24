import type { ProjectContent } from './projects.ts';

type RecordValue = Record<string, unknown>;
const record = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const string = (value: unknown): value is string => typeof value === 'string';
const optional = (value: unknown, check: (value: unknown) => boolean) =>
  value === undefined || check(value);
const array = (value: unknown, check: (value: unknown) => boolean) =>
  Array.isArray(value) && value.every(check);

function httpUrl(value: unknown): boolean {
  if (!string(value)) return false;
  try {
    const url = new URL(value);
    return (
      ['http:', 'https:'].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

function link(value: unknown): boolean {
  if (!record(value) || !string(value.label) || !string(value.href))
    return false;
  const href = value.href;
  if (/[\s\u0000-\u001f\\]/u.test(href)) return false;
  return (
    httpUrl(href) ||
    (href.startsWith('/') && !href.startsWith('//')) ||
    href.startsWith('#') ||
    (/^mailto:/iu.test(href) && new URL(href).pathname.includes('@'))
  );
}

function media(value: unknown): boolean {
  return (
    record(value) &&
    string(value.label) &&
    httpUrl(value.src) &&
    typeof value.width === 'number' &&
    Number.isFinite(value.width) &&
    value.width > 0 &&
    typeof value.height === 'number' &&
    Number.isFinite(value.height) &&
    value.height > 0
  );
}

function section(value: unknown): boolean {
  return (
    record(value) &&
    string(value.title) &&
    optional(value.kind, (kind) => kind === 'text' || kind === 'preview') &&
    optional(value.body, (body) => array(body, string)) &&
    optional(value.links, (links) => array(links, link)) &&
    optional(value.media, (items) => array(items, media)) &&
    optional(value.code, (items) =>
      array(
        items,
        (item) => record(item) && string(item.label) && string(item.source)
      )
    )
  );
}

function project(value: unknown): value is ProjectContent {
  return (
    record(value) &&
    string(value.slug) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(value.slug) &&
    ['title', 'tagline', 'description', 'summary', 'platform', 'role'].every(
      (key) => string(value[key])
    ) &&
    optional(
      value.category,
      (category) => category === 'professional' || category === 'personal'
    ) &&
    optional(value.date, string) &&
    optional(value.status, (status) =>
      ['COMPLETED', 'ONGOING', 'ARCHIVED'].includes(status as string)
    ) &&
    optional(value.cover, media) &&
    optional(value.logo, httpUrl) &&
    optional(value.logoDark, httpUrl) &&
    array(value.techStack, string) &&
    array(value.links, link) &&
    array(value.contents, section)
  );
}

export function parsePortfolioResponse(value: unknown): ProjectContent[] {
  if (!record(value) || !Array.isArray(value.projects)) {
    throw new Error('Payload CMS returned an invalid portfolio response');
  }
  const projects = value.projects;
  if (!projects.every(project)) {
    throw new Error('Payload CMS returned invalid project content');
  }
  if (new Set(projects.map((item) => item.slug)).size !== projects.length) {
    throw new Error('Payload CMS returned duplicate project slugs');
  }
  return projects;
}

// Live preview (payloadcms/src/preview.ts): the CMS signs `<expires>.<hmac>`
// over `<slug>.<expires>` with PAYLOAD_PREVIEW_SECRET. Web Crypto, so the
// same code runs on Workers and Node.
export async function verifyPreviewToken(
  slug: string,
  token: string,
  secret: string,
  now = Date.now()
): Promise<boolean> {
  const [expires, mac] = token.split('.');
  if (!/^\d+$/.test(expires ?? '') || !/^[0-9a-f]{64}$/.test(mac ?? ''))
    return false;
  if (Number(expires) * 1000 < now) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const bytes = Uint8Array.from(mac.match(/../g)!, (h) => parseInt(h, 16));
  return crypto.subtle.verify(
    'HMAC',
    key,
    bytes,
    new TextEncoder().encode(`${slug}.${expires}`)
  );
}

// Draft content for one project; never cached (preview only).
export async function fetchCmsPreview(
  origin: string,
  slug: string,
  secret: string,
  request: typeof fetch = fetch
): Promise<ProjectContent> {
  const url = new URL('/api/portfolio-preview', origin);
  url.searchParams.set('slug', slug);
  const response = await request(url, {
    cache: 'no-store',
    signal: AbortSignal.timeout(5_000),
    headers: { Accept: 'application/json', 'X-Preview-Secret': secret },
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const reason =
      record(body) && string(body.error)
        ? body.error
        : `HTTP ${response.status}`;
    throw new Error(reason);
  }
  if (!record(body) || !project(body.project))
    throw new Error('Payload CMS returned an invalid draft');
  return body.project;
}

export async function fetchCmsProjects(
  origin: string,
  request: typeof fetch = fetch
): Promise<ProjectContent[]> {
  if (!httpUrl(origin))
    throw new Error('PAYLOAD_CMS_URL must be an HTTP(S) origin');
  const url = new URL(origin);
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error(
      'PAYLOAD_CMS_URL must be an origin without a path or query'
    );
  }
  // Always fresh here; production caching lives in catalog_cache.ts. The
  // short timeout bounds how long a VPS outage stalls a render before the
  // KV last-good copy is served.
  const response = await request(new URL('/api/portfolio', url), {
    cache: 'no-store',
    signal: AbortSignal.timeout(3_000),
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Payload CMS request failed (HTTP ${response.status})`);
  }
  return parsePortfolioResponse(await response.json());
}
