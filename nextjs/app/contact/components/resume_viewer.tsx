'use client';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { RotateCcw } from 'lucide-react';
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

export default function ResumeViewer({ width }: { width: number }) {
  const [numPages, setNumPages] = useState(0);
  // Retry counter for the error state: bumping it remounts <Document>,
  // tearing down the failed load task and starting a fresh fetch without
  // closing the dialog. Safe without cache-busting — /api/resume only sets
  // Cache-Control on successful responses, never on failures.
  const [attempt, setAttempt] = useState(0);

  const errorState = (
    <div
      role="alert"
      className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 px-6 text-center"
    >
      <span className="text-ink text-sm font-semibold">
        Couldn&apos;t load the resume preview
      </span>
      <span className="text-ink-muted text-sm">
        Check your connection and try again, or use the Download button above.
      </span>
      <button
        type="button"
        onClick={() => setAttempt((attempt) => attempt + 1)}
        className="bg-accent hover:bg-accent/90 text-on-accent mt-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
      >
        <RotateCcw size={16} /> Try again
      </button>
    </div>
  );

  return (
    <Document
      key={attempt}
      file="/api/resume"
      loading={LoadingState}
      error={errorState}
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
