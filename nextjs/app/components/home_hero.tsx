'use client';

import PageHero from '@/app/components/page_hero';
import Pill from '@/components/pill';
import { motion } from 'motion/react';
import Image from 'next/image';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function Portrait({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`@container relative ${className}`}>
      {/* vinext skips next/image's auto-preload for priority images — hand
          hoist it (React 19 lifts rel=preload links into <head>). */}
      <link
        rel="preload"
        as="image"
        href="/assets/saifulmashuri.webp"
        fetchPriority="high"
      />
      {/* Script accent "Hola": wrapper declares the measured display size;
          letter fragments are spans — bare <p> would inherit the text-body
          base role and shrink the word (see design/DESIGN.md). */}
      <div className="font-cursive text-on-dark absolute top-[8%] left-[8%] z-0 flex flex-row text-[44cqw] leading-none select-none">
        <span>H</span>
        <span className="pr-[0.2em] pl-[0.2em]">o</span>
        <span>la</span>
      </div>
      <Image
        src="/assets/saifulmashuri.webp"
        // LCP element: high priority, no lazy default, preloaded in head
        // (Phase 3 — lcp-discovery fix).
        priority
        fetchPriority="high"
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
    <div className="relative z-1 flex flex-col gap-3 text-center sm:order-2 sm:text-center">
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.08, duration: 0.3 }}
        className="font-cursive text-on-dark text-5xl"
      >
        I&#39;m
      </motion.p>
      <motion.h1
        {...fadeUp}
        transition={{ delay: 0.16, duration: 0.3 }}
        className="text-on-dark text-4xl leading-none font-bold md:text-5xl lg:text-7xl"
      >
        SAIFUL MASHURI
      </motion.h1>
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.24, duration: 0.3 }}
        className="text-on-dark text-lg"
      >
        I build software that matters with highest standard
      </motion.p>
    </div>
  );
}

export default function HomeHero() {
  return (
    <PageHero innerClassName="flex flex-col items-center gap-6 px-6 pt-12 sm:flex-row sm:gap-14 sm:pb-0">
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.32, duration: 0.3 }}
        className="top-8 right-6 z-10 sm:absolute xl:right-0"
      >
        <Pill>Software Engineer</Pill>
      </motion.p>
      <Intro />
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-105 sm:order-1 sm:w-[50dvw] sm:max-w-none"
      >
        <Portrait className="w-full" />
      </motion.div>
    </PageHero>
  );
}
