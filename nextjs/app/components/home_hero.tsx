'use client';

import PageHero from '@/app/components/page_hero';
import Pill from '@/components/pill';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const SLIDES = 2;
const INTERVAL = 3000;

function Portrait({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`@container relative ${className}`}>
      <div className="font-cursive absolute top-[8%] left-[8%] z-0 flex flex-row text-[40cqw] leading-none text-white select-none">
        <p>H</p>
        <p className="pr-[0.2em] pl-[0.2em]">o</p>
        <p>la</p>
      </div>
      <Image
        src="/assets/saifulmashuri.webp"
        loading="eager"
        width={569}
        height={498}
        alt="Saiful Mashuri portrait"
        className="relative z-1 h-auto w-full"
      />
    </div>
  );
}

function Intro() {
  return (
    <div className="relative z-1 flex flex-col gap-3 text-center sm:text-center">
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.08, duration: 0.3 }}
        className="font-cursive text-5xl text-white"
      >
        I&#39;m
      </motion.p>
      <motion.h1
        {...fadeUp}
        transition={{ delay: 0.16, duration: 0.3 }}
        className="text-6xl leading-none font-bold text-white sm:text-7xl"
      >
        SAIFUL MASHURI
      </motion.h1>
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.24, duration: 0.3 }}
        className="text-l text-white"
      >
        I build software that matters with highest standard
      </motion.p>
    </div>
  );
}

function SoftwareEngineerPill() {
  return <Pill>Software Engineer</Pill>;
}

function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES), INTERVAL);
    return () => clearInterval(id);
  }, [resetKey]);

  const goTo = (next: number) => {
    setIndex(((next % SLIDES) + SLIDES) % SLIDES);
    setResetKey((k) => k + 1); // restart the auto-advance timer
  };

  return (
    <div className="relative z-10 overflow-hidden sm:hidden">
      <motion.div
        ref={trackRef}
        className="flex w-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 60) {
            goTo(info.offset.x < 0 ? index + 1 : index - 1);
          }
        }}
      >
        <div className="flex w-full shrink-0 items-center justify-center">
          <Portrait className="w-full max-w-105" />
        </div>
        <div className="flex w-full shrink-0 flex-col items-center justify-center gap-6 px-6 text-center">
          <SoftwareEngineerPill />
          <Intro />
        </div>
      </motion.div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <PageHero
      before={<MobileCarousel />}
      innerClassName="hidden flex-row items-center gap-14 px-6 pt-12 sm:flex"
    >
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-[50dvw]"
      >
        <Portrait className="w-full" />
      </motion.div>
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.32, duration: 0.3 }}
        className="absolute top-5 right-0 z-10"
      >
        <SoftwareEngineerPill />
      </motion.p>
      <Intro />
    </PageHero>
  );
}
