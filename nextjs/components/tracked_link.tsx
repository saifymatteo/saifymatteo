'use client';

import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * A next/link that fires a GA4 event on click, then lets the default
 * navigation proceed (external links open their tab as usual). Used for
 * contact CTAs — the event schema is documented in docs/adr/0010.
 * No-op-safe: if GA is not initialized, sendGAEvent only warns.
 */
export default function TrackedLink({
  gaEvent,
  gaParams,
  ...linkProps
}: {
  gaEvent: string;
  gaParams?: Record<string, string>;
} & React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...linkProps}
      onClick={() => {
        if (gaParams) sendGAEvent('event', gaEvent, gaParams);
        else sendGAEvent('event', gaEvent);
      }}
    />
  );
}
