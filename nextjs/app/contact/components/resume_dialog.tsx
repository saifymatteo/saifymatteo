'use client';

import dynamic from 'next/dynamic';
import { Download, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ResumeViewer = dynamic(() => import('./resume_viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-neutral-500">
      Loading resume…
    </div>
  ),
});

interface ResumeCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function ResumeDialog({ label, value, icon }: ResumeCardProps) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    const el = scrollRef.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex flex-row items-center justify-between rounded-2xl border border-white px-6 py-4 text-left backdrop-blur-sm transition-colors hover:border-white/50"
      >
        <span className="flex flex-row items-center">
          <span className="w-20 shrink-0 text-base font-normal text-white">
            {label}
          </span>
          <span className="underline-slide text-lg font-bold text-white sm:text-xl">
            {value}
          </span>
        </span>
        <span className="button-arrow-slide text-white">{icon}</span>
      </button>

      {open &&
        createPortal(
          <div className="z-overlay fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              tabIndex={-1}
              className="bg-primary-background border-primary-foreground flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border"
            >
              <div className="flex items-center justify-between gap-4 border-b px-6 py-4">
                <span className="text-primary-foreground text-lg font-bold">
                  {label}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="/api/resume"
                    download="Resume.Saiful.Mashuri.pdf"
                    className="bg-secondary-foreground hover:bg-secondary-foreground/90 text-secondary-background flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    <Download size={16} /> Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="text-primary-foreground hover:bg-primary-foreground/10 rounded-lg p-2 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="h-[70vh] w-full overflow-y-auto overscroll-contain bg-white"
              >
                {width > 0 && <ResumeViewer width={width} />}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
