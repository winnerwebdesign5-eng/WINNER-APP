import { motion, useReducedMotion } from 'motion/react';
import { Compass, Layers, Sparkles, Users } from 'lucide-react';
import { CORE_VALUES } from '../../data/aboutData';

const VALUE_ICONS: Record<string, typeof Compass> = {
  '01': Sparkles,
  '02': Layers,
  '03': Compass,
  '04': Users,
};

export function ValuesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="values"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/[0.08] pb-10"
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
            What We Believe In
          </p>
          <h2
            className="font-display mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            style={{ textWrap: 'balance' }}
          >
            The Principles Behind Everything We Create.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CORE_VALUES.map((value, index) => {
            const IconComponent = VALUE_ICONS[value.number] ?? Sparkles;
            return (
              <motion.article
                key={value.number}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-55 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${value.accentFrom}, ${value.accentTo})`,
                  }}
                />

                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-medium tracking-[0.12em] text-[#A3A3A3] tabular-nums">
                    {value.number}.
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/85 transition-colors duration-200 group-hover:border-white/25">
                    <IconComponent className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                </div>

                <h3 className="font-display mt-8 text-xl font-semibold tracking-[-0.015em] text-white sm:text-[22px]">
                  {value.title}
                </h3>

                <p className="mt-3.5 text-[15px] leading-[1.7] text-[#A3A3A3]">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
