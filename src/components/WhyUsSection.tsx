import { motion, useReducedMotion } from 'motion/react';
import { ADVANTAGES } from '../data/agencyData';

export function WhyUsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      className="border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left Sticky Editorial Anchor */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Why Winner Designs
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              More Than Design. We Create{' '}
              <span className="text-brand-gradient">Digital Advantage.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-[#A3A3A3]">
              A deliberate partnership model built around strategic clarity, enduring technical craft, and commercial relevance.
            </p>

            <div
              aria-hidden="true"
              className="mt-10 h-px w-24 bg-gradient-to-r from-[#FF2E93] via-[#FF9A1F] to-[#2F6BFF]"
            />
          </div>
        </motion.div>

        {/* Right Architectural Advantage List */}
        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08] lg:col-span-7 lg:border-t-0">
          {ADVANTAGES.map((item, index) => (
            <motion.div
              key={item.number}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid grid-cols-1 gap-3 py-7 first:pt-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 lg:first:pt-0"
            >
              <span className="font-display text-xs font-medium tracking-[0.14em] text-[#A3A3A3] tabular-nums sm:col-span-2">
                {item.number}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-white transition-colors duration-200 group-hover:text-white sm:col-span-5">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.68] text-[#A3A3A3] sm:col-span-5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
