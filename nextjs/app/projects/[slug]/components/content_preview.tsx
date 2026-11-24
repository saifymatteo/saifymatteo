'use client';

import ImageViewer, {
  type ImageViewerMedia,
} from '@/app/projects/[slug]/components/image_viewer';
import Marquee from '@/components/marquee';
import Image from 'next/image';
import { useState } from 'react';

interface PreviewSectionProps {
  number: string;
  title: string;
  media: ImageViewerMedia[];
  layout?: 'marquee' | 'grid';
}

export default function PreviewSection({
  number,
  title,
  media,
  layout = 'marquee',
}: PreviewSectionProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!media.length) return null;

  const marquee = [...media, ...media];

  if (layout === 'grid') {
    return (
      <>
        <div className="grid gap-6 sm:grid-cols-2">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              aria-label={`Open ${item.label}`}
              className="group focus-visible:outline-accent min-w-0 cursor-zoom-in rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt=""
                sizes="(min-width: 1040px) 500px, (min-width: 640px) 45vw, 100vw"
                unoptimized
                className="bg-parchment aspect-4/3 h-auto w-full rounded-xl object-contain"
              />
              <span className="text-caption text-ink-muted mt-3 block">
                <span className="underline-slide">{item.label}</span>
              </span>
            </button>
          ))}
        </div>
        <ImageViewer
          media={media}
          open={open}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  return (
    <div>
      <div className="content-max-width-slim px-6">
        <h2 className="text-heading flex items-center gap-3 font-bold">
          <span className="text-ink text-sm font-light">{number}</span>
          <span>{title}</span>
        </h2>
      </div>
      <div className="overflow-hidden py-2">
        <Marquee className="gap-4">
          {marquee.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i % media.length);
                setOpen(true);
              }}
              aria-label={`Open ${m.label}`}
              className="group focus-visible:outline-accent cursor-zoom-in rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="bg-parchment block aspect-video w-[min(85vw,32.5rem)] overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none">
                <Image
                  src={m.src}
                  width={m.width}
                  height={m.height}
                  alt={m.label}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-caption text-ink-muted mt-3 block">
                <span className="underline-slide">{m.label}</span>
              </span>
            </button>
          ))}
        </Marquee>
      </div>
      <ImageViewer
        media={media}
        open={open}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
