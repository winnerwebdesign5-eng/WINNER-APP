import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { DETAILED_SERVICES } from '../../data/servicesPageData';
import { MediaFrame } from '../MediaFrame';

interface ServiceShowcaseProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServiceShowcase({ onSelectService }: ServiceShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="service-showcase"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Intro Strip */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/[0.08] pb-10"
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
            Detailed Capabilities
          </p>
          <h2
            className="font-display mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Built Around Purpose, Craft and{' '}
            <span className="text-brand-gradient">Performance.</span>
          </h2>
        </motion.div>

        {/* 5 Alternating Service Showcases */}
        <div className="divide-y divide-white/[0.08]">
          {DETAILED_SERVICES.map((service, index) => {
            // Alternating layout:
            // index 0 (01): text left, image right
            // index 1 (02): image left, text right
            // index 2 (03): text left, image right
            // index 3 (04): image left, text right
            // index 4 (05): text left, image right
            const imageOnLeft = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.anchorId}
                className="scroll-mt-24 py-16 lg:py-24"
              >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Visual Column */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 ${
                      imageOnLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515]">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] opacity-75"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})`,
                        }}
                      />
                      <MediaFrame
                        src={service.image}
                        alt={service.imageAlt}
                        className="aspect-[4/3] w-full"
                        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/55 via-transparent to-transparent"
                      />
                    </div>
                  </motion.div>

                  {/* Editorial Content Column */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`lg:col-span-6 ${
                      imageOnLeft ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs font-medium tracking-[0.16em] text-[#A3A3A3] uppercase">
                      <span className="font-display text-white tabular-nums">
                        {service.number}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span>{service.categoryName}</span>
                    </div>

                    <h3
                      className="font-display mt-5 text-[clamp(1.75rem,3vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white"
                      style={{ textWrap: 'balance' }}
                    >
                      {service.headline}
                    </h3>

                    <p className="mt-5 text-base leading-[1.75] text-[#A3A3A3] sm:text-[17px]">
                      {service.description}
                    </p>

                    {/* 8 Capabilities Grid */}
                    <div className="mt-8 border-t border-white/[0.08] pt-6">
                      <p className="text-xs font-semibold tracking-[0.16em] text-white/80 uppercase">
                        Included Capabilities
                      </p>
                      <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-[#A3A3A3]"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-white/75"
                              strokeWidth={1.75}
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-9">
                      <button
                        type="button"
                        onClick={() =>
                          onSelectService(service.enquiryServiceTitle)
                        }
                        className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white hover:text-[#0A0A0A]"
                      >
                        <span>{service.ctaLabel}</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
