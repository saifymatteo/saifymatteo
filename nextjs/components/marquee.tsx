'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Scroll speed shared by every marquee on the site, in px per second.
export const MARQUEE_SPEED_PX_S = 45;

export default function Marquee({
  children,
  className = '',
  speed = MARQUEE_SPEED_PX_S,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // The keyframe loop travels half the duplicated track, so a constant
    // px/s speed needs a duration proportional to the content width.
    const setDuration = () => {
      const loopDistance = track.scrollWidth / 2;
      if (loopDistance > 0) {
        track.style.animationDuration = `${loopDistance / speed}s`;
      }
    };
    setDuration();
    const observer = new ResizeObserver(setDuration);
    observer.observe(track);
    return () => observer.disconnect();
  }, [speed]);

  return (
    <div
      ref={trackRef}
      className={`animate-marquee hover:paused flex w-max ${className}`}
    >
      {children}
    </div>
  );
}
