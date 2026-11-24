import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  fetchCmsProjects,
  parsePortfolioResponse,
} from '../lib/projects/cms.ts';
import {
  createProjectCatalog,
  type ProjectContent,
} from '../lib/projects/projects.ts';

const fixture: ProjectContent = {
  slug: 'cms-project',
  title: 'Edited in Payload',
  tagline: 'CMS tagline',
  description: 'Card description',
  summary: 'Hero summary',
  category: 'professional',
  platform: 'Web',
  role: 'Developer',
  status: 'ONGOING',
  techStack: ['TypeScript'],
  logo: 'http://localhost:3002/api/media/file/logo.svg',
  links: [{ label: 'Source', href: 'https://example.com' }],
  caseStudy: [
    { kind: 'preview', title: 'Empty preview', media: [] },
    {
      title: 'Notes',
      body: ['Content from the CMS'],
      code: [{ label: 'Demo', source: 'print(1);' }],
    },
    {
      kind: 'preview',
      title: 'Screenshots',
      media: [
        {
          label: 'Screen',
          src: 'http://localhost:3002/api/media/file/screen.webp',
          width: 800,
          height: 600,
        },
      ],
    },
  ],
};

function response(projects: unknown[] = [structuredClone(fixture)]) {
  return { projects };
}

describe('CMS portfolio contract', () => {
  it('accepts structured project content and an intentionally empty portfolio', () => {
    assert.deepEqual(parsePortfolioResponse(response()), [fixture]);
    assert.deepEqual(parsePortfolioResponse(response([])), []);
    const emailProject = {
      ...fixture,
      links: [{ label: 'Email', href: 'MAILTO:a@example.com,b@example.com' }],
    };
    assert.deepEqual(parsePortfolioResponse(response([emailProject])), [
      emailProject,
    ]);
  });

  it('rejects malformed or duplicate projects rather than partially rendering them', () => {
    for (const invalid of [
      null,
      {},
      { projects: {} },
      response([{}]),
      response([fixture, fixture]),
    ]) {
      assert.throws(() => parsePortfolioResponse(invalid), /Payload CMS/);
    }
    for (const changed of [
      { slug: '../bad' },
      { category: 'unknown' },
      { techStack: 'TypeScript' },
      { logo: 'javascript:alert(1)' },
      { links: [{ label: 'Bad', href: 'javascript:alert(1)' }] },
      { links: [{ label: 'Bad', href: '/\\evil.example' }] },
      { caseStudy: [{ title: 'Bad', body: 'not an array' }] },
      {
        cover: {
          label: 'Bad',
          src: 'https://example.com/image.png',
          width: 0,
          height: 5,
        },
      },
    ]) {
      assert.throws(
        () => parsePortfolioResponse(response([{ ...fixture, ...changed }])),
        /invalid project/
      );
    }
  });

  it('uses one independent catalog for every CMS consumer and preserves section rules', () => {
    const personal = {
      ...fixture,
      slug: 'personal',
      category: 'personal' as const,
    };
    const catalog = createProjectCatalog([fixture, personal]);
    assert.equal(catalog.getProject(fixture.slug)?.title, 'Edited in Payload');
    assert.deepEqual(catalog.projectProfessionalCurated, [fixture]);
    assert.deepEqual(catalog.projectPersonalFull, [personal]);
    assert.deepEqual(catalog.getAdjacentProjects(fixture.slug), {
      prev: undefined,
      next: personal,
    });
    assert.deepEqual(catalog.getAdjacentProjects('absent'), {
      prev: undefined,
      next: undefined,
    });
    assert.deepEqual(
      catalog.getCaseStudySections(fixture).map((s) => [s.ordinal, s.title]),
      [
        ['01', 'Notes'],
        ['02', 'Screenshots'],
      ]
    );
    assert.deepEqual(catalog.projectStats(), {
      total: 2,
      completed: 0,
      ongoing: 2,
    });
  });

  it('fetches the public endpoint without credentials or persistent caching', async () => {
    let called = 0;
    const request: typeof fetch = async (input, options) => {
      called++;
      assert.equal(String(input), 'http://localhost:3002/api/portfolio');
      assert.equal(options?.cache, 'no-store');
      assert.ok(options?.signal instanceof AbortSignal);
      assert.deepEqual(options?.headers, { Accept: 'application/json' });
      return Response.json(response());
    };
    assert.deepEqual(
      await fetchCmsProjects('http://localhost:3002/', request),
      [fixture]
    );
    assert.equal(called, 1);
  });

  it('surfaces CMS outages and invalid JSON without switching back to old content', async () => {
    await assert.rejects(
      fetchCmsProjects(
        'https://cms.example',
        async () => new Response('', { status: 503 })
      ),
      /HTTP 503/
    );
    await assert.rejects(
      fetchCmsProjects(
        'https://cms.example',
        async () => new Response('not JSON')
      ),
      SyntaxError
    );
    await assert.rejects(
      fetchCmsProjects('https://cms.example', async () => {
        throw new Error('offline');
      }),
      /offline/
    );
    await assert.rejects(
      fetchCmsProjects('https://cms.example', async () =>
        Response.json({ docs: [] })
      ),
      /invalid portfolio/
    );
  });

  it('rejects invalid CMS origins before making a request', async () => {
    for (const origin of [
      'file:///tmp/cms',
      'javascript:alert(1)',
      'https://user:pass@cms.example',
      'https://cms.example/admin',
      'https://cms.example?token=secret',
    ]) {
      await assert.rejects(
        fetchCmsProjects(origin, async () => {
          assert.fail('must not fetch');
        }),
        /PAYLOAD_CMS_URL/
      );
    }
  });
});
