import 'server-only';
import { cache } from 'react';
import { getRequestExecutionContext } from 'vinext/shims/request-context';
import { loadCatalogProjects } from './catalog_cache';
import { fetchCmsProjects } from './cms';
import { createProjectCatalog } from './projects';

type KvNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

// Workers-only bindings. The specifier is a variable so neither Turbopack
// (`next dev`, Node) nor Vite tries to resolve it; on Node the import fails
// and the catalog falls back to a plain uncached CMS fetch.
const WORKERS_MODULE = 'cloudflare:workers';
async function workerBindings() {
  try {
    const { env } = await import(/* turbopackIgnore: true */ WORKERS_MODULE);
    const edge = (globalThis as { caches?: { default?: Cache } }).caches;
    return {
      kv: (env as { CMS_CATALOG?: KvNamespace }).CMS_CATALOG,
      cache: edge?.default,
    };
  } catch {
    return {};
  }
}

// One catalog per server render: cards, metadata, navigation and sections
// agree. Strict CMS mode: the CMS is the only content source (ADR 0011).
// On Workers a 60 s edge cache and a KV last-good copy ride out VPS outages
// (lib/projects/catalog_cache.ts). With neither CMS nor copy available,
// pages render empty project content with the cause logged — never a 500.
export const getProjectCatalog = cache(async () => {
  try {
    const origin = process.env.PAYLOAD_CMS_URL?.trim();
    if (!origin) throw new Error('PAYLOAD_CMS_URL is not set');
    const ctx = getRequestExecutionContext();
    const projects = await loadCatalogProjects({
      fetchFresh: () => fetchCmsProjects(origin),
      ...(await workerBindings()),
      ...(ctx && { waitUntil: (promise) => ctx.waitUntil(promise) }),
    });
    return createProjectCatalog(projects);
  } catch (error) {
    // The cause is visible in dev and `wrangler tail`;
    // scripts/check-cms.mjs still hard-fails at deploy time.
    console.error(
      'Payload CMS unavailable — serving empty project content:',
      error instanceof Error ? error.message : error
    );
    return createProjectCatalog([]);
  }
});
