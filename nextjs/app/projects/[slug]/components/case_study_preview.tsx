'use client';

import ImageViewer, {
  type ImageViewerMedia,
} from '@/app/projects/[slug]/components/image_viewer';
import Image from 'next/image';
import { useState } from 'react';

interface PreviewSectionProps {
  number: string;
  title: string;
  media: ImageViewerMedia[];
}

export default function PreviewSection({
  number,
  title,
  media,
}: PreviewSectionProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!media.length) return null;

  const marquee = [...media, ...media];

  return (
    <div>
      <div className="content-max-width-slim">
        <h2 className="flex items-baseline gap-3">
          <span className="text-primary-foreground text-[10px] font-light">
            {number}
          </span>
          <span className="text-primary-foreground text-3xl font-bold">
            {title}
          </span>
        </h2>
      </div>
      <div className="overflow-hidden py-2">
        <div className="animate-marquee hover:paused flex w-max gap-4">
          {marquee.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i % media.length);
                setOpen(true);
              }}
              aria-label={`Open ${m.label}`}
              className="cursor-pointer"
            >
              <span className="border-grey block h-64 overflow-hidden rounded-xl border transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src={m.src}
                  width={520}
                  height={0}
                  alt={m.label}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="block">
                <p className="text-primary-foreground/50 mt-2 truncate text-sm italic">
                  {m.label}
                </p>
              </span>
            </button>
          ))}
        </div>
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
