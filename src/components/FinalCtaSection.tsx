import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onStartProject: (defaultService?: string) => void;
}

export function FinalCtaSection({ onStartProject }: FinalCtaSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#111111] py-28 lg:py-36"
    >
      {/* Subtle radial gradient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.4) 0%, rgba(139,61,255,0.32) 42%, rgba(47,107,255,0.28) 72%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase">
            Start a Conversation
          </p>

          <h2
            className="font-display mx-auto mt-5 max-w-4xl text-[clamp(2.25rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.03em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Let's Turn Your Next Idea Into a{' '}
            <span className="text-brand-gradient">Digital Win.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.7] text-[#A3A3A3] sm:text-lg">
            Have a business idea, a project in mind or a digital challenge to solve? Let's create something exceptional together.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => onStartProject()}
              className="group inline-flex min-h-[52px] cursor-pointer items-center gap-3 whitespace-nowrap rounded-sm bg-white px-8 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
            >
              <span>Start a Project</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
