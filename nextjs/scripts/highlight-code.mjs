import { mkdir, writeFile } from 'node:fs/promises';
import { createHighlighter } from 'shiki';
import { createProjectCatalog } from '../lib/projects/projects.ts';
// The site is strict-CMS; the corpus (payloadcms/content) is the offline
// source of code examples for prebuilt highlighting tokens.
import { projects } from '../../payloadcms/content/index.ts';

// Build-only: the app imports the generated tokens, never Shiki or its engine.
// All current portfolio examples are Dart (including the raw gql() example).
const catalog = createProjectCatalog(projects);
const sources = new Set(
  projects.flatMap((project) =>
    catalog
      .getCaseStudySections(project)
      .flatMap((section) =>
        (section.code ?? []).map((example) => example.source)
      )
  )
);
const highlighter = await createHighlighter({
  langs: ['dart'],
  themes: ['github-light-high-contrast', 'github-dark'],
});

try {
  const highlighted = Object.fromEntries(
    [...sources].map((source) => [
      source,
      highlighter
        .codeToTokensWithThemes(source, {
          lang: 'dart',
          // The standard light theme's red fails AA on our parchment surface.
          themes: {
            light: 'github-light-high-contrast',
            dark: 'github-dark',
          },
        })
        .map((line) =>
          line.map((token) => ({
            content: token.content,
            light: token.variants.light.color,
            dark: token.variants.dark.color,
          }))
        ),
    ])
  );
  const directory = new URL('../lib/generated/', import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(
    new URL('highlighted-code.json', directory),
    `${JSON.stringify(highlighted, null, 2)}\n`
  );
  console.log(`Generated highlighting for ${sources.size} Dart examples.`);
} finally {
  highlighter.dispose();
}
