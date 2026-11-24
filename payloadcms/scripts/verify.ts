// Destructive checks run ONLY in a new disposable database/upload directory.
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getPayload, createLocalReq } from 'payload';
import type { ProjectContent } from '../../nextjs/lib/projects/projects.ts';
// The canonical corpus this check round-trips against.
import { projects } from '../content/index.ts';
import { portfolioEndpoint } from '../src/portfolio';

const directory = await mkdtemp(path.join(os.tmpdir(), 'portfolio-payload-'));
process.env.DATABASE_URI = `file:${directory}/payload.db`;
process.env.PAYLOAD_UPLOAD_DIR = path.join(directory, 'uploads');
process.env.PAYLOAD_SECRET = randomBytes(48).toString('hex');
process.env.PAYLOAD_PUBLIC_SERVER_URL = 'http://localhost:3002';
await mkdir(process.env.PAYLOAD_UPLOAD_DIR);
const { default: config } = await import('../src/payload.config');
const payload = await getPayload({ config });

async function seed() {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('npm', ['run', 'seed'], {
      env: process.env,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`Seed exited ${code}`))
    );
  });
}
async function portfolio(
  user?: Awaited<ReturnType<typeof createLocalReq>>['user']
) {
  const req = await createLocalReq({ ...(user ? { user } : {}) }, payload);
  const response = await portfolioEndpoint(req);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  return (await response.json()).projects as ProjectContent[];
}
const canonical = (value: unknown) => JSON.parse(JSON.stringify(value));
try {
  const admin = await payload.create({
    collection: 'users',
    data: {
      email: `test-${randomBytes(8).toString('hex')}@example.invalid`,
      password: randomBytes(32).toString('hex'),
    },
  });
  const adminUser = { ...admin, collection: 'users' as const };
  // The random test user is confined to this disposable DB, not the local app.
  await seed();
  const media = await payload.find({
    collection: 'media',
    pagination: false,
    limit: 1000,
  });
  assert.ok(
    media.docs.every(
      (m) =>
        typeof m.width === 'number' &&
        m.width > 0 &&
        typeof m.height === 'number' &&
        m.height > 0
    ),
    'Uploaded images must have intrinsic dimensions from Sharp'
  );
  const sourcePaths = new Map(
    media.docs.map((m) => [
      new URL(m.url!, 'http://localhost:3002').href,
      m.sourcePath,
    ])
  );
  const output = await portfolio();
  const restored = JSON.parse(JSON.stringify(output), (key, value) =>
    ['src', 'logo', 'logoDark'].includes(key) && typeof value === 'string'
      ? (sourcePaths.get(value) ?? value)
      : value
  );
  assert.deepEqual(restored, canonical(projects as ProjectContent[]));
  console.log(
    `VERIFIED exact content round trip: ${output.length} projects, ${media.totalDocs} media (all paths/order/dimensions/raw sections).`
  );

  const first = (
    await payload.find({
      collection: 'projects',
      sort: ['order', 'id'],
      limit: 1,
    })
  ).docs[0];
  const draftData = {
    slug: 'verification-draft',
    order: -1,
    title: 'Draft',
    tagline: 'Draft tagline',
    description: 'Draft description',
    summary: 'Draft summary',
    platform: 'Web',
    role: 'Tester',
    techStack: [{ name: 'TypeScript' }],
    caseStudy: [{ title: 'Draft section' }],
    _status: 'draft' as const,
  };
  await payload.create({
    collection: 'projects',
    data: draftData,
    draft: true,
    user: adminUser,
    overrideAccess: false,
  });
  await payload.update({
    collection: 'projects',
    id: first.id,
    draft: true,
    user: adminUser,
    overrideAccess: false,
    data: { title: 'Authored unpublished draft', _status: 'draft' },
  });
  assert.deepEqual(await portfolio(), output);
  assert.deepEqual(await portfolio(adminUser), output);
  const publicDocs = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    draft: true,
    pagination: false,
    limit: 100,
  });
  assert.ok(publicDocs.docs.every((doc) => doc._status === 'published'));
  console.log(
    'VERIFIED drafts excluded for anonymous AND authenticated portfolio requests; unpublished edits do not leak.'
  );

  await assert.rejects(
    payload.find({ collection: 'users', overrideAccess: false })
  );
  for (const collection of ['users', 'projects', 'media'] as const) {
    await assert.rejects(
      payload.create({ collection, overrideAccess: false, data: {} as never })
    );
    await assert.rejects(
      payload.update({
        collection,
        id:
          collection === 'users'
            ? admin.id
            : collection === 'projects'
              ? first.id
              : media.docs[0].id,
        overrideAccess: false,
        data: {},
      })
    );
    await assert.rejects(
      payload.delete({
        collection,
        id:
          collection === 'users'
            ? admin.id
            : collection === 'projects'
              ? first.id
              : media.docs[0].id,
        overrideAccess: false,
      })
    );
  }
  assert.equal(
    (await payload.find({ collection: 'media', overrideAccess: false }))
      .totalDocs,
    media.totalDocs
  );
  assert.equal(
    (
      await payload.find({
        collection: 'users',
        user: adminUser,
        overrideAccess: false,
      })
    ).totalDocs,
    1
  );
  console.log(
    'VERIFIED collection ACL: anonymous writes/users reads denied; media public reads/admin users read allowed.'
  );

  const tie = await payload.create({
    collection: 'projects',
    user: adminUser,
    overrideAccess: false,
    data: {
      ...draftData,
      slug: 'verification-tie',
      order: first.order,
      _status: 'published',
    },
  });
  const tied = await portfolio();
  // The numeric `order` governs the endpoint sort; ties break by `id`, so a
  // fresh document sharing the first document's `order` value sorts right
  // after it (higher id), ahead of every higher `order`.
  assert.deepEqual(
    tied.slice(0, 2).map((p) => p.slug),
    [first.slug, tie.slug]
  );
  await payload.delete({
    collection: 'projects',
    id: tie.id,
    user: adminUser,
    overrideAccess: false,
  });
  await seed();
  assert.equal(
    (await payload.count({ collection: 'media' })).totalDocs,
    media.totalDocs
  );
  const authored = await payload.findByID({
    collection: 'projects',
    id: first.id,
    draft: true,
  });
  assert.equal(authored.title, 'Authored unpublished draft');
  assert.deepEqual(await portfolio(), output);
  console.log(
    'VERIFIED stable order/id tie-break; second seed preserves authored drafts and deduplicates media.'
  );
} finally {
  await payload.destroy();
  await rm(directory, { recursive: true, force: true });
}
