import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, ExternalLink } from 'lucide-react';
import { FEATURED_WEBSITES } from '../../data/portfolioPageData';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PortfolioHero() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTarget = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const lineOne = ['Digital', 'Experiences.'];
  const lineTwo = ['Beautifully', 'Built.'];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pb-20 pt-14 lg:pb-28 lg:pt-24">
      {/* Subtle Gradient Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-20 top-4 h-[360px] w-[360px] rounded-full opacity-20 blur-[135px] lg:h-[460px] lg:w-[460px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.42) 0%, rgba(139,61,255,0.22) 55%, transparent 78%)',
          }}
        />
        <div
          className="absolute right-[6%] top-[22%] h-[340px] w-[340px] rounded-full opacity-15 blur-[135px] lg:h-[430px] lg:w-[430px]"
          style={{
            background:
              'radial-gradient(circle, rgba(47,107,255,0.42) 0%, rgba(255,154,31,0.2) 60%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Typography */}
          <div className="lg:col-span-7">
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase sm:text-[13px]"
            >
              Our Creative Showcase
            </motion.p>

            <h1
              className="font-display mt-5 max-w-3xl text-[clamp(2.55rem,5.2vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
              style={{ textWrap: 'balance' }}
            >
              <span className="block">
                {lineOne.map((word, idx) => (
                  <motion.span
                    key={word}
                    initial={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.08,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="mr-[0.26em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="mt-1 block">
                {lineTwo.map((word, idx) => (
                  <motion.span
                    key={word}
                    initial={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : 0.24 + idx * 0.09,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="text-brand-gradient mr-[0.26em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : 0.42,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-7 max-w-xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg"
            >
              Explore selected website showcases and digital experiences. Discover how thoughtful design, engaging layouts and functional experiences come together to create memorable online destinations.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : 0.54,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <button
                type="button"
                onClick={() => scrollToTarget('#featured-websites')}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                <span>Explore Our Work</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>

              <p className="font-display text-xs font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-[13px]">
                Your Partner for Digital Wins.
              </p>
            </motion.div>
          </div>

          {/* Right Floating Website Interface Directory */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: prefersReducedMotion ? 0 : 0.25,
              ease: EASE_OUT_EXPO,
            }}
            className="lg:col-span-5"
          >
            <div className="rounded-sm border border-white/[0.1] bg-[#111111] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
                  Selected Website Showcases
                </p>
                <span className="text-xs text-[#A3A3A3] tabular-nums">
                  01 — 02
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {FEATURED_WEBSITES.map((site) => (
                  <div
                    key={site.id}
                    className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-5 transition-colors duration-200 hover:border-white/25"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-65 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${site.accentFrom}, ${site.accentTo})`,
                      }}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-medium tracking-[0.14em] text-[#A3A3A3] uppercase">
                          {site.number} · {site.category}
                        </p>
                        <h2 className="font-display mt-1.5 text-xl font-semibold tracking-tight text-white">
                          {site.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#A3A3A3]">
                          {site.domain}
                        </p>
                      </div>

                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${site.title} live website`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-[#111111] text-white/85 transition-colors hover:border-white/35 hover:text-white"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <button
                        type="button"
                        onClick={() => scrollToTarget(`#showcase-${site.id}`)}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-white/90 uppercase transition-colors hover:text-white"
                      >
                        <span>Inspect Showcase</span>
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <span className="text-[11px] text-[#A3A3A3]">
                        Original Domain
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
