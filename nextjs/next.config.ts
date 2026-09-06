import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow the Lightbox to request sharper-than-default images.
    qualities: [75, 90],
    // vinext's optimizer route is a 302 pass-through to the original file
    // on Workers (free plan) — every image paid a wasted round trip
    // (ADR-0004, Phase 3 plan). Sources are already right-sized webp;
    // serve them directly.
    unoptimized: true,
  },
};

export default nextConfig;
