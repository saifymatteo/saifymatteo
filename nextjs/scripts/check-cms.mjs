// Read-only smoke check: run both local apps and publish a project before running.
import assert from 'node:assert/strict';
import { fetchCmsProjects } from '../lib/projects/cms.ts';

const cms = process.env.PAYLOAD_CMS_URL ?? 'http://localhost:3002';
const site = process.env.PORTFOLIO_URL ?? 'http://localhost:3001';
const projects = await fetchCmsProjects(cms);

async function page(path, status = 200) {
  const response = await fetch(new URL(path, site), {
    signal: AbortSignal.timeout(15_000),
    cache: 'no-store',
  });
  assert.equal(response.status, status, `${path} HTTP status`);
  return response.text();
}

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
    }[char];
  });

await page('/');
const listing = await page('/projects');
const sitemap = await page('/sitemap.xml');
const sitemapSlugs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))
  .map((match) => new URL(match[1]).pathname)
  .filter((path) => path.startsWith('/projects/'))
  .map((path) => path.slice('/projects/'.length));
assert.deepEqual(
  sitemapSlugs.sort(),
  projects.map((project) => project.slug).sort(),
  'Sitemap must match the published CMS slugs (check Worker environment configuration)'
);
for (const project of projects) {
  const detail = await page(`/projects/${project.slug}`);
  assert.ok(
    detail.includes(escapeHtml(project.title)),
    `${project.slug}: detail title`
  );
  assert.ok(
    listing.includes(escapeHtml(project.title)),
    `${project.slug}: listing title`
  );
}
await page('/projects/__cms_smoke_missing__', 404);
console.log(
  `Verified ${projects.length} published CMS projects across listing, detail pages and sitemap; home and missing-project responses are correct.`
);
