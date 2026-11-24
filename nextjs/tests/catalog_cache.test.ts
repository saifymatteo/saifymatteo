import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  CACHE_KEY,
  KV_KEY,
  loadCatalogProjects,
} from '../lib/projects/catalog_cache.ts';
import type { ProjectContent } from '../lib/projects/projects.ts';

const project = (slug: string): ProjectContent => ({
  slug,
  title: slug,
  tagline: 't',
  description: 'd',
  summary: 's',
  platform: 'Web',
  role: 'Dev',
  techStack: [],
  links: [],
  caseStudy: [],
});

function fakes(stored: string | null = null) {
  const cacheStore = new Map<string, string>();
  const kvStore = new Map<string, string>();
  if (stored) kvStore.set(KV_KEY, stored);
  let kvWrites = 0;
  const pending: Promise<unknown>[] = [];
  return {
    cacheStore,
    kvStore,
    kvWrites: () => kvWrites,
    settle: () => Promise.all(pending),
    deps: {
      cache: {
        match: async (key: RequestInfo | URL) => {
          const text = cacheStore.get(String(key));
          return text === undefined ? undefined : new Response(text);
        },
        put: async (key: RequestInfo | URL, response: Response) => {
          cacheStore.set(String(key), await response.text());
        },
      },
      kv: {
        get: async (key: string) => kvStore.get(key) ?? null,
        put: async (key: string, value: string) => {
          kvWrites++;
          kvStore.set(key, value);
        },
      },
      waitUntil: (promise: Promise<unknown>) => void pending.push(promise),
      log: () => {},
    },
  };
}

const down = async (): Promise<ProjectContent[]> => {
  throw new Error('connect ECONNREFUSED');
};

describe('catalog cache', () => {
  it('fetches fresh, caches it, and writes KV only when content changes', async () => {
    const f = fakes();
    const fresh = async () => [project('a')];
    assert.deepEqual(
      await loadCatalogProjects({ ...f.deps, fetchFresh: fresh }),
      [project('a')]
    );
    await f.settle();
    assert.ok(f.cacheStore.has(CACHE_KEY));
    assert.equal(f.kvWrites(), 1);

    f.cacheStore.clear(); // cache expired, same content
    await loadCatalogProjects({ ...f.deps, fetchFresh: fresh });
    await f.settle();
    assert.equal(
      f.kvWrites(),
      1,
      'unchanged content must not spend a KV write'
    );
  });

  it('serves a cache hit without calling the CMS', async () => {
    const f = fakes();
    f.cacheStore.set(
      CACHE_KEY,
      JSON.stringify({ projects: [project('cached')] })
    );
    const projects = await loadCatalogProjects({ ...f.deps, fetchFresh: down });
    assert.equal(projects[0].slug, 'cached');
  });

  it('serves the KV last-good copy when the CMS is down', async () => {
    const f = fakes(JSON.stringify({ projects: [project('stale')] }));
    const projects = await loadCatalogProjects({ ...f.deps, fetchFresh: down });
    assert.equal(projects[0].slug, 'stale');
    await f.settle();
    assert.ok(f.cacheStore.has(CACHE_KEY), 'stale copy is re-cached briefly');
  });

  it('rethrows when the CMS is down and no copy exists (empty-content path)', async () => {
    const f = fakes();
    await assert.rejects(
      loadCatalogProjects({ ...f.deps, fetchFresh: down }),
      /ECONNREFUSED/
    );
  });

  it('works without Worker bindings (Node dev): plain fetch', async () => {
    const projects = await loadCatalogProjects({
      fetchFresh: async () => [project('dev')],
    });
    assert.equal(projects[0].slug, 'dev');
  });
});
