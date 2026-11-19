import { motion, useReducedMotion } from 'motion/react';
import { TRUST_PILLARS } from '../data/agencyData';

export function TrustStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="trust"
      aria-label="Core Agency Capabilities"
      className="border-y border-white/[0.08] bg-[#111111]"
    >
      <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10 lg:py-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6"
        >
          {TRUST_PILLARS.map((pillar, index) => (
            <div key={pillar} className="flex items-center gap-6">
              <span className="font-display text-sm font-medium tracking-[0.16em] text-white/90 uppercase sm:text-[15px]">
                {pillar}
              </span>
              {index < TRUST_PILLARS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden h-4 w-px bg-white/15 sm:inline-block"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
