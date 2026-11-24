import assert from 'node:assert/strict';
import test from 'node:test';
import type { PayloadRequest } from 'payload';
import type { Project, Media } from '../src/payload-types';
import {
  portfolioEndpoint,
  serverURL,
  toProjectContent,
} from '../src/portfolio';
import { meaningfulText, safeLink } from '../src/collections';

const image: Media = {
  id: 1,
  alt: 'Screenshot',
  url: '/api/media/file/screenshot.webp',
  width: 100,
  height: 200,
  createdAt: '',
  updatedAt: '',
};
const project: Project = {
  id: 1,
  order: 0,
  slug: 'example',
  title: 'Example',
  tagline: 'Tagline',
  description: 'Description',
  summary: 'Summary',
  platform: 'Web',
  role: 'Developer',
  techStack: [{ name: 'TypeScript' }],
  logo: image,
  logoDark: image,
  cover: [{ label: 'Cover', image }],
  links: [{ label: 'Source', href: 'https://example.com' }],
  contents: [
    { title: 'Empty preview', kind: 'preview' },
    {
      title: 'Details',
      body: [{ text: 'Raw `code` and [link](https://example.com).' }],
      code: [{ label: 'Code', source: 'const x = 1;' }],
      media: [{ label: 'Gallery', image, width: 123, height: 456 }],
    },
  ],
  _status: 'published',
  createdAt: '',
  updatedAt: '',
};

test('maps native relationships to the canonical shape without CMS metadata or render transforms', () => {
  const result = toProjectContent(project, 'http://localhost:3002');
  assert.deepEqual(result, {
    slug: 'example',
    title: 'Example',
    tagline: 'Tagline',
    description: 'Description',
    summary: 'Summary',
    platform: 'Web',
    role: 'Developer',
    techStack: ['TypeScript'],
    logo: 'http://localhost:3002/api/media/file/screenshot.webp',
    logoDark: 'http://localhost:3002/api/media/file/screenshot.webp',
    cover: {
      label: 'Cover',
      src: 'http://localhost:3002/api/media/file/screenshot.webp',
      width: 100,
      height: 200,
    },
    links: [{ label: 'Source', href: 'https://example.com' }],
    contents: [
      { title: 'Empty preview', kind: 'preview' },
      {
        title: 'Details',
        body: ['Raw `code` and [link](https://example.com).'],
        code: [{ label: 'Code', source: 'const x = 1;' }],
        media: [
          {
            label: 'Gallery',
            src: 'http://localhost:3002/api/media/file/screenshot.webp',
            width: 123,
            height: 456,
          },
        ],
      },
    ],
  });
});

test('mapping fails closed for drafts, missing relationships and invalid dimensions/origins', () => {
  assert.throws(() =>
    toProjectContent({ ...project, _status: 'draft' }, 'http://localhost:3002')
  );
  assert.throws(() =>
    toProjectContent({ ...project, logo: 123 }, 'http://localhost:3002')
  );
  assert.throws(() =>
    toProjectContent(
      {
        ...project,
        cover: [{ label: 'Bad', image: { ...image, width: null } }],
      },
      'http://localhost:3002'
    )
  );
  assert.throws(() =>
    toProjectContent(
      { ...project, logo: { ...image, url: 'https://evil.example/logo.svg' } },
      'http://localhost:3002'
    )
  );
  assert.throws(() => serverURL('javascript:alert(1)'));
  assert.throws(() => serverURL('https://example.com/subpath'));
});

for (const authenticated of [false, true]) {
  test(`endpoint enforces published-only ACL, stable DB sort, pagination and no-store (authenticated=${authenticated})`, async () => {
    let calls = 0;
    const req = {
      user: authenticated ? { id: 1 } : null,
      payload: {
        find: async (options: Record<string, unknown>) => {
          calls++;
          assert.equal(options.req, req);
          assert.equal(options.overrideAccess, false);
          assert.equal(options.draft, false);
          assert.deepEqual(options.where, { _status: { equals: 'published' } });
          assert.deepEqual(options.sort, ['order', 'id']);
          assert.equal(options.page, calls);
          return {
            docs: [{ ...project, slug: `project-${calls}` }],
            hasNextPage: calls === 1,
          };
        },
        logger: { error: () => assert.fail('Unexpected API error') },
      },
    } as unknown as PayloadRequest;
    const response = await portfolioEndpoint(req);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    const body = await response.json();
    assert.deepEqual(
      body.projects.map((p: { slug: string }) => p.slug),
      ['project-1', 'project-2']
    );
    assert.equal(calls, 2);
  });
}

test('database or mapping failures return a logged 500, not an empty success', async () => {
  for (const failure of ['database', 'mapping']) {
    let logged = false;
    const response = await portfolioEndpoint({
      payload: {
        find: async () => {
          if (failure === 'database') throw new Error('Database failed');
          return { docs: [{ ...project, logo: 999 }], hasNextPage: false };
        },
        logger: {
          error: () => {
            logged = true;
          },
        },
      },
    } as unknown as PayloadRequest);
    assert.equal(response.status, 500);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await response.json(), {
      error: 'Portfolio content is temporarily unavailable.',
    });
    assert.ok(logged);
  }
});

test('link and text validation rejects unsafe schemes while preserving supported authored text', () => {
  for (const link of [
    'https://example.com/path',
    'http://localhost:3002',
    'mailto:hello@example.com',
    '/projects/a',
    '#section',
  ])
    assert.equal(safeLink(link), true);
  for (const link of [
    'javascript:alert(1)',
    'data:text/html,evil',
    '//evil.example',
    '/\\evil.example',
    'https://user:password@example.com',
    ' https://example.com',
    'https://example.com/\n',
  ])
    assert.notEqual(safeLink(link), true);
  assert.notEqual(meaningfulText('   '), true);
  assert.notEqual(meaningfulText('[bad](javascript:alert%281%29)'), true);
  assert.equal(
    meaningfulText('Use `code` and [source](https://example.com).'),
    true
  );
});
