import { motion, useReducedMotion } from 'motion/react';
import { STORY_PARAGRAPHS } from '../../data/aboutData';

export function StorySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="our-story"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      {/* Subtle decorative gradient accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full opacity-10 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,154,31,0.5) 0%, rgba(255,46,147,0.25) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Oversized Editorial Heading */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              The Story Behind the Brand
            </p>
            <h2
              className="font-display mt-5 text-[clamp(2.1rem,3.8vw,3.35rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Built on Creativity. Driven by{' '}
              <span className="text-brand-gradient">Possibility.</span>
            </h2>
            <div
              aria-hidden="true"
              className="mt-8 h-px w-20 bg-gradient-to-r from-[#FF2E93] via-[#FF9A1F] to-[#2F6BFF]"
            />
          </motion.div>

          {/* Right Editorial Narrative (No unnecessary cards) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: prefersReducedMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-7 lg:col-span-7"
          >
            <p className="font-display text-xl font-medium leading-[1.55] tracking-[-0.01em] text-white sm:text-2xl">
              {STORY_PARAGRAPHS[0]}
            </p>
            <div className="h-px w-full bg-white/[0.08]" />
            <p className="text-base leading-[1.8] text-[#A3A3A3] sm:text-[17px]">
              {STORY_PARAGRAPHS[1]}
            </p>
            <p className="text-base leading-[1.8] text-[#A3A3A3] sm:text-[17px]">
              {STORY_PARAGRAPHS[2]}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
