import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { toSectionViews } from '../lib/projects/case_study.ts';
import {
  getCaseStudySections,
  getFeaturedProjects,
  projects,
} from '../lib/projects/projects.ts';
import type { CaseStudySection } from '../lib/projects/case_study.ts';

const text = (title: string, body?: string[]): CaseStudySection => ({
  title,
  body,
});
const preview = (): CaseStudySection => ({
  title: 'Preview',
  kind: 'preview',
  media: [{ label: 'x', src: '/x.webp', width: 10, height: 10 }],
});
const previewNoMedia = (): CaseStudySection => ({
  title: 'Preview',
  kind: 'preview',
});
const ordinals = (views: { ordinal: string }[]) => views.map((v) => v.ordinal);

describe('toSectionViews — media-less Preview drop', () => {
  it('drops a media-less Preview at the head', () => {
    const views = toSectionViews([previewNoMedia(), text('A'), preview()]);
    assert.deepEqual(ordinals(views), ['01', '02']);
    assert.deepEqual(
      views.map((v) => v.title),
      ['A', 'Preview']
    );
  });

  it('drops a media-less Preview mid-sequence', () => {
    const views = toSectionViews([text('A'), previewNoMedia(), text('B')]);
    assert.deepEqual(ordinals(views), ['01', '02']);
    assert.deepEqual(
      views.map((v) => v.title),
      ['A', 'B']
    );
  });

  it('drops a media-less Preview at the tail', () => {
    const views = toSectionViews([text('A'), preview(), previewNoMedia()]);
    assert.deepEqual(ordinals(views), ['01', '02']);
  });

  it('keeps a Preview that has media, in its original slot', () => {
    const views = toSectionViews([text('A'), preview(), text('B')]);
    assert.deepEqual(ordinals(views), ['01', '02', '03']);
    assert.deepEqual(views[1].kind, 'preview');
    assert.deepEqual(views[1].media?.length, 1);
  });

  it('drops an empty-array media Preview like a missing one', () => {
    const views = toSectionViews([
      { title: 'Preview', kind: 'preview', media: [] },
      text('A'),
    ]);
    assert.deepEqual(ordinals(views), ['01']);
  });
});

describe('toSectionViews — ordinals', () => {
  it('numbers every surviving section from position, zero-padded', () => {
    const views = toSectionViews([text('A'), text('B'), text('C')]);
    assert.deepEqual(ordinals(views), ['01', '02', '03']);
  });

  it('keeps ordinals contiguous after any drop', () => {
    const views = toSectionViews([
      preview(),
      text('A'),
      previewNoMedia(),
      text('B'),
    ]);
    assert.deepEqual(ordinals(views), ['01', '02', '03']);
  });

  it('numbers a single text section 01', () => {
    const views = toSectionViews([text('Only')]);
    assert.deepEqual(ordinals(views), ['01']);
  });

  it('handles a case study that is all text (no Preview at all)', () => {
    const views = toSectionViews([text('A'), text('B')]);
    assert.deepEqual(
      views.every((v) => v.kind === 'text'),
      true
    );
    assert.deepEqual(ordinals(views), ['01', '02']);
  });

  it('handles an empty case study', () => {
    assert.deepEqual(toSectionViews([]), []);
  });
});

describe('toSectionViews — kind resolution', () => {
  it('treats an omitted kind as text', () => {
    const views = toSectionViews([text('A')]);
    assert.deepEqual(views[0].kind, 'text');
  });

  it('preserves the authored title and body', () => {
    const views = toSectionViews([text('Problem', ['one', 'two'])]);
    assert.deepEqual(views[0].title, 'Problem');
    assert.deepEqual(views[0].body, ['one', 'two']);
  });
});

describe('real project data', () => {
  it('renders contiguous numbering for every project', () => {
    for (const project of projects) {
      const views = getCaseStudySections(project);
      assert.ok(views.length > 0, `${project.slug} has no sections`);
      views.forEach((v, i) => {
        assert.deepEqual(
          v.ordinal,
          String(i + 1).padStart(2, '0'),
          `${project.slug}: ${v.title} ordinal out of order`
        );
      });
    }
  });

  it('gives every rendered Preview section media', () => {
    for (const project of projects) {
      for (const view of getCaseStudySections(project)) {
        if (view.kind === 'preview') {
          assert.ok(
            view.media && view.media.length > 0,
            `${project.slug}: media-less Preview survived the drop rule`
          );
        }
      }
    }
  });
});

describe('getFeaturedProjects', () => {
  it('features the first three projects by module order', () => {
    const featured = getFeaturedProjects();
    assert.deepEqual(featured.length, 3);
    assert.deepEqual(featured, projects.slice(0, 3));
  });
});
