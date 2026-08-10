'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Subtle scroll reveal: fade + 20px rise, plays once when ~10% into the viewport.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
