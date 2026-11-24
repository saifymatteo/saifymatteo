import { parsePortfolioResponse } from './cms.ts';
import type { ProjectContent } from './projects.ts';

// Edge cache in front of the VPS-hosted CMS (docs/payload-cms.md, ADR 0011
// amendment). Order: per-colo Cache API (fresh for 60 s) → CMS → KV
// "last-good" copy when the CMS is down or invalid. Every path re-validates,
// so a corrupt cache entry can never reach a page. Dependencies are injected
// so Node tests (and `next dev`, which has no Cache API/KV) can run it.

export const CACHE_KEY = 'https://catalog-cache.internal/cms-portfolio';
export const KV_KEY = 'cms-portfolio:last-good';
export const FRESH_SECONDS = 60;

export type CatalogCacheDeps = {
  fetchFresh: () => Promise<ProjectContent[]>;
  cache?: Pick<Cache, 'match' | 'put'>;
  kv?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
  waitUntil?: (promise: Promise<unknown>) => void;
  log?: (message: string) => void;
};

const parse = (text: string) => parsePortfolioResponse(JSON.parse(text));
const serialize = (projects: ProjectContent[]) => JSON.stringify({ projects });

export async function loadCatalogProjects({
  fetchFresh,
  cache,
  kv,
  waitUntil = (promise) => void promise.catch(() => {}),
  log = console.error,
}: CatalogCacheDeps): Promise<ProjectContent[]> {
  const remember = (text: string) =>
    cache?.put(
      CACHE_KEY,
      new Response(text, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `max-age=${FRESH_SECONDS}`,
        },
      })
    );

  try {
    const hit = await cache?.match(CACHE_KEY);
    if (hit) return parse(await hit.text());
  } catch (error) {
    log(`Catalog cache unreadable, refetching: ${message(error)}`);
  }

  try {
    const projects = await fetchFresh();
    const text = serialize(projects);
    waitUntil(
      Promise.all([
        remember(text),
        // KV free tier allows 1k writes/day: read-compare, write only on change.
        kv
          ?.get(KV_KEY)
          .then((stored) =>
            stored === text ? undefined : kv.put(KV_KEY, text)
          ),
      ])
    );
    return projects;
  } catch (error) {
    const stored = await kv?.get(KV_KEY).catch(() => null);
    if (!stored) throw error;
    const projects = parse(stored);
    log(`Payload CMS unavailable — serving last-good copy: ${message(error)}`);
    // Re-cache the stale copy briefly so an outage costs one CMS timeout per
    // colo per minute, not one per request.
    waitUntil(Promise.resolve(remember(stored)));
    return projects;
  }
}

const message = (error: unknown) =>
  error instanceof Error ? error.message : String(error);
