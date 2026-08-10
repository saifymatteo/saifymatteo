'use client';

import ShaderBackdrop from '@/components/shader_backdrop';
import { motion } from 'motion/react';
import Image from 'next/image';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/** Home hero: shader backdrop + staggered entrance on load. */
export default function HomeHero() {
  return (
    <section className="from-blue to-blue-light relative overflow-hidden bg-linear-to-r">
      <ShaderBackdrop />
      <div className="relative z-10 mx-auto flex w-full max-w-281.5 flex-col items-center gap-6 px-6 pt-12 pb-16 sm:flex-row sm:items-center sm:gap-14 sm:pt-16 sm:pb-24">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full sm:w-[38dvw]"
        >
          <p className="font-cursive absolute -top-16 left-0 z-0 text-[35vw] leading-none text-white/50 select-none sm:top-0 sm:text-[18vw]">
            Hla
          </p>
          <Image
            src="/assets/saifulmashuri.png"
            loading="eager"
            width={620}
            height={0}
            alt="Saiful Mashuri portrait"
            className="relative z-1 h-auto w-full"
          />
        </motion.div>
        <div className="relative z-1 flex flex-col gap-3 text-center sm:text-left">
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.08, duration: 0.3 }}
            className="font-cursive text-6xl text-white"
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
            className="text-xl text-white/90"
          >
            I build software that matters with highest standard
          </motion.p>
        </div>
      </div>
      <motion.p
        {...fadeUp}
        transition={{ delay: 0.32, duration: 0.3 }}
        className="text-blue absolute top-5 right-8 z-10 hidden rounded-4xl border border-[#A8D8FF] bg-white px-4 py-1.5 font-mono text-xl font-semibold sm:block dark:border-white/30 dark:bg-[#1f2937] dark:text-white"
      >
        Software Engineer
      </motion.p>
    </section>
  );
}
