import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Cpu, Layout, PenTool, TrendingUp } from 'lucide-react';
import { EXPERTISE_CATEGORIES } from '../../data/aboutData';

interface ExpertiseSectionProps {
  onSelectCapability: (capability: string) => void;
}

const EXPERTISE_ICONS: Record<string, typeof Layout> = {
  'website-design': Layout,
  'ai-automation': Cpu,
  'creative-design': PenTool,
  'digital-growth': TrendingUp,
};

export function ExpertiseSection({ onSelectCapability }: ExpertiseSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="expertise"
      className="border-y border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Our Expertise
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Where Creativity Meets Digital Expertise.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#A3A3A3] sm:text-base">
            Focused disciplines across design, development, and intelligent automation built to support real business momentum.
          </p>
        </motion.div>

        {/* Progress-free 4-Category Capability Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EXPERTISE_CATEGORIES.map((category, index) => {
            const IconComponent = EXPERTISE_ICONS[category.id] ?? Layout;
            return (
              <motion.article
                key={category.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-8 transition-colors duration-200 hover:border-white/20 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${category.accentFrom}, ${category.accentTo})`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium tracking-[0.12em] text-[#A3A3A3] tabular-nums">
                      {category.number}.
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/90 transition-colors duration-200 group-hover:border-white/25">
                      <IconComponent className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3 className="font-display mt-7 text-xl font-semibold tracking-[-0.015em] text-white sm:text-2xl">
                    {category.title}
                  </h3>

                  <ul className="mt-6 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="py-3 text-sm leading-relaxed text-[#A3A3A3] transition-colors duration-200 group-hover:text-white/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectCapability(category.title)}
                    className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.08em] text-white/85 uppercase transition-colors duration-200 hover:text-white"
                  >
                    <span>Discuss {category.title}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
