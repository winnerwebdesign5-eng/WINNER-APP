import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ServicesFinalCtaProps {
  onStartProject: () => void;
}

export function ServicesFinalCta({ onStartProject }: ServicesFinalCtaProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services-final-cta"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#111111] py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,154,31,0.3) 0%, rgba(255,46,147,0.32) 45%, rgba(47,107,255,0.28) 80%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.22em] text-[#A3A3A3] uppercase">
            Your Partner for Digital Wins.
          </p>

          <h2
            className="font-display mx-auto mt-5 max-w-4xl text-[clamp(2.25rem,4.5vw,3.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Let&apos;s Build Something That{' '}
            <span className="text-brand-gradient">
              Moves Your Business Forward.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg">
            Your business has potential. Let&apos;s create the digital experience that helps the world see it.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onStartProject}
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
