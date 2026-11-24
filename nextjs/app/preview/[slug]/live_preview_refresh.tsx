'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Payload's Live Preview protocol: announce readiness to the admin window,
// then re-render on each `payload-document-event` (fired after a draft
// save/autosave). Messages from any other origin are ignored.
export default function LivePreviewRefresh({
  cmsOrigin,
}: {
  cmsOrigin: string;
}) {
  const router = useRouter();
  useEffect(() => {
    const origin = new URL(cmsOrigin).origin;
    const parent = window.opener ?? window.parent;
    parent?.postMessage({ type: 'payload-live-preview', ready: true }, origin);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== origin) return;
      if (event.data?.type === 'payload-document-event') router.refresh();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [cmsOrigin, router]);
  return null;
}
