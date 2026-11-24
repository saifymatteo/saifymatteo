'use client';

import { GA_INIT_SCRIPT, GA_LOADER_SRC } from '@/lib/ga';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';

/**
 * The head scripts that must execute from the server-rendered HTML, before
 * React hydrates: the async gtag.js loader, the inline gtag bootstrap that
 * defines `window.gtag` (ADR 0010), and the theme boot script that paints
 * `data-theme` before first paint (ADR 0007).
 *
 * Rendered during SSR only — the browser runs them once from the initial
 * HTML, after which React no longer needs them. Returning null on the client
 * keeps React from ever creating <script> elements itself: React 19.2 logs
 * "Encountered a script tag while rendering React component" whenever it has
 * to render a script on the client (e.g. hydration recovery), and those
 * never execute. Same fix next-themes shipped for its boot script. Keep the
 * order: loader, gtag bootstrap, theme boot.
 */
export default function BootScripts() {
  if (typeof window !== 'undefined') return null;
  return (
    <>
      <script async src={GA_LOADER_SRC} />
      <script
        dangerouslySetInnerHTML={{
          __html: GA_INIT_SCRIPT,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: THEME_BOOT_SCRIPT,
        }}
      />
    </>
  );
}
