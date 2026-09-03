import type { ReactNode } from 'react';

export default function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-secondary-background text-secondary-foreground rounded-full px-4 py-1.5 font-mono text-lg font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
