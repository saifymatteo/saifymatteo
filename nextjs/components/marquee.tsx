import type { ReactNode } from 'react';

export default function Marquee({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-marquee hover:paused flex w-max ${className}`}>
      {children}
    </div>
  );
}
