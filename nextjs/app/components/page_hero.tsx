import ShaderBackdrop from '@/components/shader_backdrop';
import type { ReactNode } from 'react';

export default function PageHero({
  children,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section className={`gradient-surface ${className}`}>
      <ShaderBackdrop />
      <div className={`content-max-width z-content relative ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
