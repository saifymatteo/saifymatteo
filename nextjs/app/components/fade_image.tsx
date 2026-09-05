'use client';

import Image from 'next/image';
import { useState, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * next/image that fades in over a subtle plate once decoded.
 *
 * The element starts at opacity-0 on a `primary-foreground/8` plate while the
 * browser downloads/decodes, then fades in. The plate is dropped once loaded
 * so transparent images (logos) keep their see-through areas.
 *
 * vinext's Image shim replays `onLoad` during hydration when the image is
 * already complete (cached / repeat visits), so nothing stays hidden.
 */
export default function FadeImage({
  alt,
  className,
  onLoad,
  ...props
}: ComponentProps<typeof Image>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      className={cn(
        'bg-primary-foreground/8 transition-opacity duration-700 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
    />
  );
}
