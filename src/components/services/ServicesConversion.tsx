import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ServicesConversionProps {
  onStartProject: () => void;
}

export function ServicesConversion({ onStartProject }: ServicesConversionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services-conversion"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      {/* Controlled radial gradient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[460px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.38) 0%, rgba(139,61,255,0.3) 45%, rgba(47,107,255,0.28) 78%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-sm border border-white/[0.1] bg-[#151515]/80 p-8 sm:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
                Ready When You Are
              </p>
              <h2
                className="font-display mt-4 text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-[1.09] tracking-[-0.025em] text-white"
                style={{ textWrap: 'balance' }}
              >
                Your Next Big Digital Move{' '}
                <span className="text-brand-gradient">Starts Here.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg">
                Whether you need a professional website, smarter business workflows or a stronger digital presence, let&apos;s discuss how Winner Designs can help.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
              <button
                type="button"
                onClick={onStartProject}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                <span>Let&apos;s Start Your Project</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>

              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.04]"
              >
                <span>Talk to Us</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
