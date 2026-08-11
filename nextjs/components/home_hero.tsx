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
    <section className="gradient-surface">
      <ShaderBackdrop />
      <div className="content-max-width relative z-10 flex flex-col items-center gap-6 px-6 pt-12 sm:flex-row sm:items-center sm:gap-14">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full sm:w-[50dvw]"
        >
          <div className="font-cursive absolute -top-16 left-0 z-0 flex flex-row text-[35vw] leading-none text-white select-none sm:top-10 sm:left-14 sm:space-x-[11vw] sm:text-[16vw]">
            <p>H</p>
            <p>la</p>
          </div>
          <Image
            src="/assets/saifulmashuri.png"
            loading="eager"
            width={620}
            height={0}
            alt="Saiful Mashuri portrait"
            className="relative z-1 h-auto w-full"
          />
        </motion.div>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.32, duration: 0.3 }}
          className="text-secondary-foreground bg-secondary-background absolute top-5 right-0 z-10 hidden rounded-full px-4 py-1.5 font-mono text-lg font-semibold sm:block"
        >
          Software Engineer
        </motion.p>
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
      </div>
    </section>
  );
}
