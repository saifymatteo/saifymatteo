'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

export interface ImageViewerMedia {
  label: string;
  src: string;
}

export interface ImageViewerProps {
  media: ImageViewerMedia[];
  open: boolean;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export default function ImageViewer({
  media,
  open,
  index,
  onIndexChange,
  onClose,
}: ImageViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const step = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + media.length) % media.length),
    [media.length, index, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, step]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={media[index].label}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-6" />
      </button>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous image"
        className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4"
      >
        <ChevronLeft className="size-7" />
      </button>

      <figure className="flex max-h-full flex-col items-center gap-4">
        <Image
          src={media[index].src}
          alt={media[index].label}
          width={1200}
          height={0}
          className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="text-white">
          <span className="font-medium">{media[index].label}</span>
          <span className="ml-2 text-sm text-white/60">
            {index + 1} / {media.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next image"
        className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4"
      >
        <ChevronRight className="size-7" />
      </button>
    </div>
  );
}
