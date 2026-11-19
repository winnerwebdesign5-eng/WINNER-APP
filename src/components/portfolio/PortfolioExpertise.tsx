import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_EXPERTISE } from '../../data/portfolioPageData';
import { MediaFrame } from '../MediaFrame';

interface PortfolioExpertiseProps {
  onNavigateToService: (serviceAnchor: string) => void;
}

export function PortfolioExpertise({
  onNavigateToService,
}: PortfolioExpertiseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="portfolio-expertise"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32"
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
              Explore Our Expertise
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Digital Solutions With Purpose.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToService('')}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 self-start border-b border-white/25 pb-1 text-xs font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:border-white lg:self-end"
          >
            <span>View All Services</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PORTFOLIO_EXPERTISE.map((item, index) => (
            <motion.article
              key={item.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] transition-colors duration-200 hover:border-white/25"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${item.accentFrom}, ${item.accentTo})`,
                }}
              />

              <div>
                <MediaFrame
                  src={item.image}
                  alt={item.imageAlt}
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="p-5">
                  <h3 className="font-display text-base font-semibold leading-snug tracking-[-0.01em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-[1.65] text-[#A3A3A3]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToService(item.serviceAnchor)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] text-white/85 uppercase transition-colors hover:text-white"
                >
                  <span>Explore service</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
