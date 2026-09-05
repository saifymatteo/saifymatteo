'use client';

import ImageViewer, {
  type ImageViewerMedia,
} from '@/app/projects/[slug]/components/image_viewer';
import Marquee from '@/components/marquee';
import FadeImage from '@/app/components/fade_image';
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
      <div className="content-max-width-slim px-6">
        <h2 className="flex items-center gap-3">
          <span className="text-primary-foreground text-sm font-light">
            {number}
          </span>
          <span className="text-primary-foreground text-3xl font-bold">
            {title}
          </span>
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
              className="cursor-pointer"
            >
              <span className="border-grey block h-64 w-130 overflow-hidden rounded-xl border transition-transform duration-300 hover:scale-[1.02]">
                <FadeImage
                  src={m.src}
                  width={m.width}
                  height={m.height}
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
