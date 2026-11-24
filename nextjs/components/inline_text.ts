import { createElement, type ReactNode } from 'react';

function isSafeHref(href: string) {
  if (href.includes('\\')) return false;
  if (href.startsWith('#')) return true;
  if (href.startsWith('/')) return !href.startsWith('//');
  try {
    return ['http:', 'https:', 'mailto:'].includes(new URL(href).protocol);
  } catch {
    return false;
  }
}

// A deliberately small inline subset, not a full Markdown or HTML renderer.
// createElement keeps the actual renderer testable with Node's strip-types runner.
export default function InlineText({ text }: { text: string }): ReactNode[] {
  return text
    .split(/(`[^`\n]+`|\[[^\]\n]+\]\([^()\s]+\))/g)
    .map((part, index) => {
      if (index % 2 === 0) return part;
      if (part.startsWith('`')) {
        return createElement(
          'code',
          {
            key: index,
            className:
              'bg-parchment text-ink rounded px-1 py-0.5 font-mono text-[0.9em] [overflow-wrap:anywhere]',
          },
          part.slice(1, -1)
        );
      }
      const separator = part.indexOf('](');
      const label = part.slice(1, separator);
      const href = part.slice(separator + 2, -1);
      if (!label.trim() || !isSafeHref(href)) return part;
      return createElement(
        'a',
        {
          key: index,
          href,
          ...(/^https?:/i.test(href)
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}),
          className:
            'underline-squiggle text-ink decoration-accent focus-visible:outline-accent rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 [overflow-wrap:anywhere]',
        },
        createElement(InlineText, { text: label })
      );
    });
}
