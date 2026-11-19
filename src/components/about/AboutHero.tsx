import { motion, useReducedMotion } from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  const lineOne = ['Creativity', 'Meets', 'Technology.'];
  const lineTwo = ['Purpose', 'Meets', 'Possibility.'];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pb-20 pt-14 lg:pb-28 lg:pt-24">
      {/* Subtle background gradient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-[8%] top-0 h-[360px] w-[360px] rounded-full opacity-20 blur-[135px] lg:h-[440px] lg:w-[440px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.42) 0%, rgba(139,61,255,0.22) 55%, transparent 78%)',
          }}
        />
        <div
          className="absolute right-[6%] top-[24%] h-[320px] w-[320px] rounded-full opacity-15 blur-[135px] lg:h-[420px] lg:w-[420px]"
          style={{
            background:
              'radial-gradient(circle, rgba(47,107,255,0.42) 0%, rgba(255,154,31,0.2) 58%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Introductory Label */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase sm:text-[13px]"
        >
          Get to Know Us
        </motion.p>

        {/* Oversized Headline with staggered reveal & selective gradient words */}
        <h1
          className="font-display mt-6 max-w-5xl text-[clamp(2.5rem,5.2vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
          style={{ textWrap: 'balance' }}
        >
          <span className="block">
            {lineOne.map((word, idx) => {
              const isHighlighted = word === 'Technology.';
              return (
                <motion.span
                  key={word}
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={`mr-[0.26em] inline-block ${
                    isHighlighted ? 'text-brand-gradient' : ''
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
          <span className="mt-1 block">
            {lineTwo.map((word, idx) => {
              const isHighlighted = word === 'Possibility.';
              return (
                <motion.span
                  key={word}
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: prefersReducedMotion ? 0 : 0.28 + idx * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={`mr-[0.26em] inline-block ${
                    isHighlighted ? 'text-brand-gradient' : ''
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        </h1>

        {/* Supporting Paragraph & Signature Tagline Split */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: prefersReducedMotion ? 0 : 0.52,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-10 grid grid-cols-1 items-end gap-8 border-t border-white/[0.08] pt-9 lg:grid-cols-12 lg:gap-12"
        >
          <p className="max-w-2xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg lg:col-span-7">
            At Winner Designs, we believe every business deserves a digital presence that communicates value, builds trust and creates opportunities. We combine thoughtful design, modern technology and creative problem-solving to help brands move forward.
          </p>

          {/* Distinctive visual tagline lockup */}
          <div className="flex flex-col items-start lg:col-span-5 lg:items-end lg:text-right">
            <span
              aria-hidden="true"
              className="mb-3 h-[2px] w-16 bg-gradient-to-r from-[#FF2E93] via-[#FF9A1F] to-[#2F6BFF]"
            />
            <p className="font-display text-sm font-semibold tracking-[0.22em] text-white uppercase sm:text-base">
              Your Partner for{' '}
              <span className="text-brand-gradient">Digital Wins.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
