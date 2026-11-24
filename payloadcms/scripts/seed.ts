import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPayload } from 'payload';
// The import corpus: authored content, moved out of the site package.
import { projects as corpus } from '../content/index.ts';
import type { Media, Project } from '../src/payload-types';

// Load the local ignored environment before importing the configuration.
try {
  process.loadEnvFile('.env');
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}
const { default: config } = await import('../src/payload.config');
const payload = await getPayload({ config });
const publicRoot = await realpath(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../nextjs/public'
  )
);
const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};
const cache = new Map<string, Media>();

async function upload(sourcePath: string, alt: string): Promise<Media> {
  if (cache.has(sourcePath)) return cache.get(sourcePath)!;
  if (!sourcePath.startsWith('/assets/') || /[?#\\\u0000]/.test(sourcePath))
    throw new Error(`Not a local asset: ${sourcePath}`);
  // Resolve symlinks too: an asset must remain inside nextjs/public.
  const filename = await realpath(path.resolve(publicRoot, `.${sourcePath}`));
  if (!filename.startsWith(publicRoot + path.sep))
    throw new Error(`Asset escaped public/: ${sourcePath}`);
  const mimetype = mimeTypes[path.extname(filename).toLowerCase()];
  if (!mimetype) throw new Error(`Unsupported image type: ${sourcePath}`);
  const existing = await payload.find({
    collection: 'media',
    where: { sourcePath: { equals: sourcePath } },
    limit: 1,
  });
  if (existing.docs[0]) {
    cache.set(sourcePath, existing.docs[0]);
    return existing.docs[0];
  }
  const data = await readFile(filename);
  const media = await payload.create({
    collection: 'media',
    data: { alt, sourcePath },
    file: {
      data,
      mimetype,
      name: `${createHash('sha256').update(sourcePath).digest('hex').slice(0, 12)}-${path.basename(filename)}`,
      size: data.length,
    },
  });
  cache.set(sourcePath, media);
  return media;
}

type Image = { label: string; src: string; width: number; height: number };
async function visual(image: Image) {
  return {
    label: image.label,
    image: (await upload(image.src, image.label)).id,
    width: image.width,
    height: image.height,
  };
}

try {
  // Bootstrap belongs to Payload's first-user screen, never to a seed password.
  const users = await payload.count({ collection: 'users' });
  if (!users.totalDocs)
    throw new Error(
      'Create your first admin at /admin before running the seed. No user was created.'
    );
  let created = 0;
  let skipped = 0;
  for (const [order, project] of corpus.entries()) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
      draft: true,
    });
    if (existing.docs.length) {
      console.log(`Preserved existing project: ${project.slug}`);
      skipped++;
      continue;
    }
    // Preserve the corpus content exactly;
    // getCaseStudySections is a compatibility fallback, not the primary content source.
    const sections = project.caseStudy;
    const { logo, logoDark, cover, techStack, ...base } = project;
    const data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      ...base,
      order,
      _status: 'published',
      techStack: techStack.map((name) => ({ name })),
      ...(logo
        ? { logo: (await upload(logo, `${project.title} logo`)).id }
        : {}),
      ...(logoDark
        ? {
            logoDark: (await upload(logoDark, `${project.title} dark logo`)).id,
          }
        : {}),
      ...(cover ? { cover: [await visual(cover)] } : {}),
      caseStudy: await Promise.all(
        sections.map(async (section) => ({
          ...section,
          body: section.body?.map((text) => ({ text })),
          media: section.media
            ? await Promise.all(section.media.map(visual))
            : undefined,
        }))
      ),
    };
    await payload.create({ collection: 'projects', data });
    console.log(`Created project: ${project.slug}`);
    created++;
  }
  console.log(
    `Seed complete: ${created} created, ${skipped} preserved; ${cache.size} referenced media reused/uploaded.`
  );
} finally {
  await payload.destroy();
}
