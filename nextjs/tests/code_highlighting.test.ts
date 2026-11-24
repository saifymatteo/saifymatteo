import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { createProjectCatalog } from '../lib/projects/projects.ts';
import { projects } from '../../payloadcms/content/index.ts';

const catalog = createProjectCatalog(projects);

type Token = { content: string; light: string; dark: string };
const highlighted: Record<string, Token[][]> = JSON.parse(
  readFileSync(
    new URL('../lib/generated/highlighted-code.json', import.meta.url),
    'utf8'
  )
);
const sources = [
  ...new Set(
    projects.flatMap((project) =>
      catalog
        .getCaseStudySections(project)
        .flatMap((section) =>
          (section.code ?? []).map((example) => example.source)
        )
    )
  ),
];

describe('build-time syntax highlighting', () => {
  it('covers exactly the authored examples (run npm run highlight after edits)', () => {
    assert.ok(sources.length > 0);
    assert.deepEqual(Object.keys(highlighted).sort(), [...sources].sort());
  });

  it('preserves every character, indentation and line break', () => {
    for (const source of sources) {
      assert.equal(
        highlighted[source]
          .map((line) => line.map((token) => token.content).join(''))
          .join('\n'),
        source
      );
    }
  });

  it('provides real syntax colours in both light and dark themes', () => {
    for (const lines of Object.values(highlighted)) {
      const tokens = lines.flat();
      for (const token of tokens) {
        assert.match(token.light, /^#[\da-f]{6}([\da-f]{2})?$/i);
        assert.match(token.dark, /^#[\da-f]{6}([\da-f]{2})?$/i);
      }
      assert.ok(new Set(tokens.map((token) => token.light)).size >= 3);
      assert.ok(new Set(tokens.map((token) => token.dark)).size >= 3);
      assert.ok(tokens.some((token) => token.light !== token.dark));
    }
  });

  it('keeps token contrast at least 4.5:1 on the existing code surfaces', () => {
    const luminance = (hex: string) => {
      assert.equal(hex.length, 7, 'Contrast check expects opaque RGB tokens');
      const [r, g, b] = [1, 3, 5].map((index) => {
        const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const surfaces = { light: '#f5f5f7', dark: '#353535' };
    for (const token of Object.values(highlighted).flat(2)) {
      for (const theme of ['light', 'dark'] as const) {
        const foreground = luminance(token[theme]);
        const background = luminance(surfaces[theme]);
        const contrast =
          (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05);
        assert.ok(
          contrast >= 4.5,
          `${theme} token ${token[theme]} has only ${contrast.toFixed(2)}:1 contrast`
        );
      }
    }
  });
});
