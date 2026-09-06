import type { ReactNode } from 'react';

export default function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // Phase 2 (ADR-0009): parchment bg + ink text so the pill passes WCAG AA
    // everywhere it appears — including on the gradient band (Lighthouse
    // color-contrast failure fixed; ~15.9:1 light / ~12:1 dark).
    <span
      className={`bg-parchment text-ink rounded-full px-4 py-1.5 font-mono text-lg font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
