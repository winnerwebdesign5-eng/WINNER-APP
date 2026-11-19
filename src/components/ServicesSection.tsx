import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Layout,
  Mail,
  PenTool,
  ShoppingBag,
} from 'lucide-react';
import { SERVICES } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const SERVICE_ICONS: Record<string, typeof Layout> = {
  'website-design': Layout,
  'ai-automation': Cpu,
  'ecommerce-development': ShoppingBag,
  'brand-graphic-design': PenTool,
  'web-applications': Layers,
  'email-lead-generation': Mail,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32"
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
              Capabilities &amp; Craft
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              What We Bring to the Table.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#A3A3A3] sm:text-base">
            Focused disciplines crafted to elevate brand perception, streamline operations, and drive meaningful customer action.
          </p>
        </motion.div>

        {/* 6 Service Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.id] ?? Layout;
            return (
              <motion.article
                key={service.id}
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-7 transition-colors duration-200 hover:border-white/20 lg:p-8"
              >
                {/* Subtle gradient hairline accent at top */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-medium tracking-[0.08em] text-[#A3A3A3] tabular-nums">
                      {service.number}.
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/90 transition-colors duration-200 group-hover:border-white/25">
                      <IconComponent className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3 className="font-display mt-8 text-xl font-semibold leading-snug tracking-[-0.015em] text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3.5 text-[15px] leading-[1.68] text-[#A3A3A3]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.08em] text-white/85 uppercase transition-colors duration-200 hover:text-white"
                  >
                    <span>Explore service</span>
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
