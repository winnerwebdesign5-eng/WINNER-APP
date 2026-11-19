import { motion, useReducedMotion } from 'motion/react';

export function CommitmentSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="commitment"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      {/* Subtle ambient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[135px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.38) 0%, rgba(139,61,255,0.28) 48%, rgba(47,107,255,0.25) 80%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase">
            Our Commitment
          </p>

          <h2
            className="font-display mt-5 max-w-4xl text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.09] tracking-[-0.025em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Your Goals Deserve More Than Ordinary Solutions.
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-[1.8] text-[#A3A3A3] sm:text-lg">
            Every business has something valuable to offer. Our commitment is to help communicate that value through thoughtful digital experiences, reliable functionality and creative solutions designed around your goals.
          </p>

          <div className="mt-12 border-t border-white/[0.08] pt-8">
            <p className="font-display text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
              <span className="text-white">We Design With Purpose. </span>
              <span className="text-brand-gradient">
                We Build With Intention.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
