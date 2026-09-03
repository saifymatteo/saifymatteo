import ShaderBackdrop from '@/components/shader_backdrop';
import type { ReactNode } from 'react';

export default function PageHero({
  children,
  className = '',
  innerClassName = '',
  before,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  before?: ReactNode;
}) {
  return (
    <section className={`gradient-surface ${className}`}>
      <ShaderBackdrop />
      {before}
      <div className={`content-max-width relative z-10 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
