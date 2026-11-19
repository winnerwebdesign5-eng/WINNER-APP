import { motion, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../../data/aboutData';

export function ApproachSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="approach" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/[0.08] pb-10"
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
            Our Approach
          </p>
          <h2
            className="font-display mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Thoughtful Process. Meaningful Results.
          </h2>
        </motion.div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative mt-14">
          {/* Desktop horizontal connector rail */}
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-0 right-0 top-[23px] hidden h-px origin-left bg-gradient-to-r from-[#FF2E93]/60 via-[#FF9A1F]/50 to-[#2F6BFF]/60 lg:block"
          />

          {/* Mobile vertical connector rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-[#FF2E93]/60 via-[#8B3DFF]/50 to-[#2F6BFF]/60 lg:hidden"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-start gap-6 lg:block"
              >
                {/* Step Node */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-sm font-semibold tracking-[0.08em] text-white tabular-nums">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="pt-1 lg:pt-8">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#A3A3A3]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
