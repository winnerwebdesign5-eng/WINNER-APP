import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DETAILED_SERVICES } from '../../data/servicesPageData';
import { MediaFrame } from '../MediaFrame';

export function ServicesOverview() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToService = (anchorId: string) => {
    const target = document.getElementById(anchorId);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="services-overview"
      className="border-t border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Services Overview
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              What We Can Do for Your Business.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
            Every business has different needs. That&apos;s why we offer thoughtful digital services designed to solve problems, strengthen your online presence and create better experiences for your customers.
          </p>
        </motion.div>

        {/* Asymmetric Editorial Bento Grid (5 Categories) */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {DETAILED_SERVICES.map((service, index) => {
            // Asymmetric desktop spans: Row 1 (12 cols featured split), Row 2 (6 + 6), Row 3 (5 + 7)
            const colSpanClass =
              index === 0
                ? 'lg:col-span-12'
                : index === 1 || index === 2
                  ? 'lg:col-span-6'
                  : index === 3
                    ? 'lg:col-span-5'
                    : 'lg:col-span-7';

            const isLeadRow = index === 0;

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
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] transition-colors duration-200 hover:border-white/20 ${colSpanClass}`}
              >
                {/* Top gradient hairline */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})`,
                  }}
                />

                <div
                  className={`grid h-full grid-cols-1 ${
                    isLeadRow ? 'lg:grid-cols-12' : ''
                  }`}
                >
                  {/* Visual Preview */}
                  <div
                    className={`relative overflow-hidden ${
                      isLeadRow ? 'lg:order-2 lg:col-span-6' : ''
                    }`}
                  >
                    <MediaFrame
                      src={service.image}
                      alt={service.imageAlt}
                      className={
                        isLeadRow
                          ? 'aspect-[16/10] w-full lg:h-full'
                          : 'aspect-[16/10] w-full'
                      }
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151515]/70 via-transparent to-transparent"
                    />
                  </div>

                  {/* Content Column */}
                  <div
                    className={`flex flex-col justify-between p-7 lg:p-9 ${
                      isLeadRow ? 'lg:order-1 lg:col-span-6' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-medium tracking-[0.12em] text-[#A3A3A3] tabular-nums">
                          {service.number}.
                        </span>
                        <span className="text-xs font-medium tracking-[0.1em] text-[#A3A3A3] uppercase">
                          Core Service
                        </span>
                      </div>

                      <h3 className="font-display mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
                        {service.categoryName}
                      </h3>

                      <p className="mt-3 text-[15px] leading-[1.7] text-[#A3A3A3]">
                        {service.overviewIntro}
                      </p>

                      {/* 4 Capabilities list */}
                      <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
                        {service.overviewHighlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-sm text-white/85"
                          >
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 shrink-0 rounded-full"
                              style={{ backgroundColor: service.accentFrom }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 border-t border-white/[0.06] pt-5">
                      <button
                        type="button"
                        onClick={() => scrollToService(service.anchorId)}
                        className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:text-white/80"
                      >
                        <span>Explore service</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
