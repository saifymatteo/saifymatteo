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

export default function ResumeViewer({ width }: { width: number }) {
  const [numPages, setNumPages] = useState(0);

  return (
    <Document
      file="/api/resume"
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
