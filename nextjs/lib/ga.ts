/**
 * GA4 wiring without `@next/third-parties`.
 *
 * `@next/third-parties`' `GoogleAnalytics` component crashes SSR under the
 * vinext/Cloudflare Workers runtime (HTTP 500 on every server-rendered route),
 * so GA is loaded with plain script tags in the root layout instead — the same
 * pattern as `THEME_BOOT_SCRIPT`. The inline bootstrap defines the standard
 * global `gtag()` (which pushes onto `window.dataLayer`), and `sendGAEvent`
 * reuses that global for the manual events documented in docs/adr/0010.
 *
 * Event schema (ADR 0010): `contact_click{method, location}`,
 * `resume_view{location}`, `resume_download{location}`.
 */

export const GA_MEASUREMENT_ID = 'G-2HQ4SXE1CJ';

/** Inline gtag.js bootstrap: dataLayer + global gtag() + config. */
export const GA_INIT_SCRIPT = `
  window['dataLayer'] = window['dataLayer'] || [];
  function gtag(){window['dataLayer'].push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');
`;

/** Async loader for the gtag.js library. */
export const GA_LOADER_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event from the client. Safe no-op during SSR and when the gtag
 * bootstrap hasn't run (e.g. an ad blocker removed the script).
 */
export function sendGAEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;
  if (params) window.gtag?.('event', eventName, params);
  else window.gtag?.('event', eventName);
}
