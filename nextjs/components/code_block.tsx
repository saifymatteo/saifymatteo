import { Fragment, type CSSProperties } from 'react';
import highlightedCode from '@/lib/generated/highlighted-code.json';

type Token = { content: string; light: string; dark: string };
const snippets: Record<string, Token[][]> = highlightedCode;

export default function CodeBlock({
  source,
  label,
}: {
  source: string;
  label: string;
}) {
  // Unknown or newly edited snippets remain readable until regeneration.
  const lines = Object.hasOwn(snippets, source) ? snippets[source] : undefined;

  return (
    <pre
      role="region"
      tabIndex={0}
      aria-label={label}
      className="syntax-code text-caption focus-visible:outline-accent overflow-x-auto font-mono focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <code>
        {lines
          ? lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && '\n'}
                {line.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className="syntax-token"
                    style={
                      {
                        '--code-light': token.light,
                        '--code-dark': token.dark,
                      } as CSSProperties
                    }
                  >
                    {token.content}
                  </span>
                ))}
              </Fragment>
            ))
          : source}
      </code>
    </pre>
  );
}
