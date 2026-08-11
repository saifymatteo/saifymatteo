import Reveal from '@/components/reveal';
import ShaderBackdrop from '@/components/shader_backdrop';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactCta() {
  return (
    <section className="pb-24">
      <div className="gradient-bar h-2" />
      <Reveal className="content-max-width">
        <div className="gradient-surface mx-auto mt-14 flex w-full max-w-3xl flex-col items-center gap-6 rounded-[20px] px-8 py-12 text-center shadow-lg">
          <ShaderBackdrop />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-5xl font-bold text-white">Interested?</h2>
            <p className="max-w-xl text-base text-white">
              I&#39;m excited to start a new project with you! For business
              inquiries, please contact me.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-2.5 text-xl font-medium text-white transition-all duration-300 hover:bg-white/20 active:scale-95"
            >
              Get in touch <ArrowRight className="button-arrow-slide size-5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
