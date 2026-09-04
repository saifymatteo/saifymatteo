import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow the Lightbox to request sharper-than-default images.
    qualities: [75, 90],
  },
};

export default nextConfig;
