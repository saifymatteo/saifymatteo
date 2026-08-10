'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/** Global motion defaults: respect prefers-reduced-motion, subtle easing. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </MotionConfig>
  );
}
