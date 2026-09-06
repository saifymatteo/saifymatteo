'use client';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useState } from 'react';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
}

/** Spinner shown while the PDF fetch + parse runs (can take seconds —
 * /api/resume is a force-dynamic proxy to the remote source). */
const LoadingState = (
  <div
    role="status"
    aria-live="polite"
    className="flex h-[60vh] w-full flex-col items-center justify-center gap-4"
  >
    <span
      aria-hidden
      className="border-hairline border-t-accent h-8 w-8 animate-spin rounded-full border-2"
    />
    <span className="text-ink-muted text-sm">Loading resume…</span>
  </div>
);

const ErrorState = (
  <div
    role="alert"
    className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 px-6 text-center"
  >
    <span className="text-ink text-sm font-semibold">
      Couldn’t load the resume preview
    </span>
    <span className="text-ink-muted text-sm">
      Check your connection and try again, or use the Download button above.
    </span>
  </div>
);

export default function ResumeViewer({ width }: { width: number }) {
  const [numPages, setNumPages] = useState(0);

  return (
    <Document
      file="/api/resume"
      loading={LoadingState}
      error={ErrorState}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={width}
            className="mx-auto border-t border-b border-black/20"
          />
        ))}
      </div>
    </Document>
  );
}
