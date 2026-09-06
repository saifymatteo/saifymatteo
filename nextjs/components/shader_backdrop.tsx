'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy wrapper: the 265KB three.js chunk loads as a deferred client chunk
 * (never on the critical path), and the canvas itself mount/pauses via the
 * frozen-frame lifecycle in shader_backdrop_canvas (Phase 3, P2).
 * `loading: null` — the parent Brand Band already paints the CSS gradient
 * surface behind this slot, so there is nothing to show while the chunk
 * travels.
 */
const ShaderBackdropCanvas = dynamic(() => import('./shader_backdrop_canvas'), {
  ssr: false,
  loading: () => null,
});

export default function ShaderBackdrop() {
  return <ShaderBackdropCanvas />;
}
