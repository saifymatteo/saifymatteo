'use client';

import PageHero from '@/app/components/page_hero';
import FadeImage from '@/app/components/fade_image';
import Pill from '@/components/pill';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function Portrait({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`@container relative ${className}`}>
      <div className="font-cursive absolute top-[8%] left-[8%] z-0 flex flex-row text-[40cqw] leading-none text-white select-none">
        <p>H</p>
        <p className="pr-[0.2em] pl-[0.2em]">o</p>
        <p>la</p>
      </div>
      <FadeImage
        src="/assets/saifulmashuri.webp"
        priority
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
        className="font-cursive text-5xl text-white"
      >
        I&#39;m
      </motion.p>
      <motion.h1
        {...fadeUp}
        transition={{ delay: 0.16, duration: 0.3 }}
        className="text-4xl leading-none font-bold text-white md:text-5xl lg:text-7xl"
      >
        SAIFUL MASHURI
      </motion.h1>
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.24, duration: 0.3 }}
        className="text-lg text-white"
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
