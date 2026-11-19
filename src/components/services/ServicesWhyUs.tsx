import { motion, useReducedMotion } from 'motion/react';
import { Compass, Cpu, Layers, Target } from 'lucide-react';
import { WHY_CHOOSE_SERVICES } from '../../data/servicesPageData';

const WHY_ICONS: Record<string, typeof Target> = {
  '01': Target,
  '02': Layers,
  '03': Cpu,
  '04': Compass,
};

export function ServicesWhyUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-choose-services"
      className="border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              The Winner Designs Standard
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Why Businesses Choose Winner Designs.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
            Because great digital solutions should look exceptional, work seamlessly and serve a real purpose.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {WHY_CHOOSE_SERVICES.map((item, index) => {
            const IconComponent = WHY_ICONS[item.number] ?? Target;
            return (
              <motion.article
                key={item.number}
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
                className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-8 transition-colors duration-200 hover:border-white/20 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${item.accentFrom}, ${item.accentTo})`,
                  }}
                />

                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-medium tracking-[0.12em] text-[#A3A3A3] tabular-nums">
                    {item.number}.
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/90 transition-colors duration-200 group-hover:border-white/25">
                    <IconComponent className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                </div>

                <h3 className="font-display mt-8 text-xl font-semibold tracking-[-0.015em] text-white sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3.5 text-[15px] leading-[1.7] text-[#A3A3A3]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
