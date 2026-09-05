'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

export interface ImageViewerMedia {
  label: string;
  src: string;
  // Intrinsic pixel dimensions of the media file.
  width: number;
  height: number;
}

export interface ImageViewerProps {
  media: ImageViewerMedia[];
  open: boolean;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const controlClass =
  'rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70';

// Vertical chrome budget: dialog padding (2rem) + gap (1rem) + a two-line
// caption (3rem). Keeps the image as large as the viewport allows.
const imageMaxHeight = 'max-h-[calc(100dvh-6rem)]';
const imageMaxWidth = 'max-w-[calc(100vw-2rem)]';

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
      className="z-overlay fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className={`absolute top-4 right-4 z-10 p-2 ${controlClass}`}
      >
        <X className="size-6" />
      </button>

      <figure className="flex max-h-full flex-col items-center gap-4">
        {/* The wrapper shrink-wraps the image so the tap zones cover exactly
            the visible image, split in half along the x axis. */}
        <div className={`relative flex w-fit ${imageMaxWidth}`}>
          <Image
            src={media[index].src}
            alt={media[index].label}
            width={media[index].width}
            height={media[index].height}
            quality={90}
            className={`h-auto w-auto rounded-lg object-contain shadow-2xl ${imageMaxHeight} ${imageMaxWidth}`}
          />
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
          />
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
          />
        </div>
        <figcaption className="flex flex-wrap items-baseline justify-center gap-x-2 text-white">
          <span className="font-medium">{media[index].label}</span>
          <span className="text-sm text-white/60">
            {index + 1} / {media.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous image"
        className={`absolute top-1/2 left-2 z-10 -translate-y-1/2 p-2 sm:left-4 ${controlClass}`}
      >
        <ChevronLeft className="size-7" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next image"
        className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 p-2 sm:right-4 ${controlClass}`}
      >
        <ChevronRight className="size-7" />
      </button>
    </div>
  );
}
