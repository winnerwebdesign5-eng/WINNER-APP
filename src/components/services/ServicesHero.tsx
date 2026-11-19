import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SERVICES_HERO_MEDIA } from '../../data/servicesPageData';
import { MediaFrame } from '../MediaFrame';

interface ServicesHeroProps {
  onStartProject: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesHero({ onStartProject }: ServicesHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleExploreServices = () => {
    const target = document.querySelector('#services-overview');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pb-20 pt-12 lg:pb-28 lg:pt-20">
      {/* Controlled ambient gradient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-24 top-8 h-[360px] w-[360px] rounded-full opacity-20 blur-[135px] lg:h-[460px] lg:w-[460px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.42) 0%, rgba(139,61,255,0.22) 55%, transparent 78%)',
          }}
        />
        <div
          className="absolute right-[4%] top-[18%] h-[340px] w-[340px] rounded-full opacity-15 blur-[135px] lg:h-[440px] lg:w-[440px]"
          style={{
            background:
              'radial-gradient(circle, rgba(47,107,255,0.42) 0%, rgba(255,154,31,0.22) 58%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase sm:text-[13px]"
            >
              What We Do
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: prefersReducedMotion ? 0 : 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,4.9vw,4.35rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Digital Solutions Designed to{' '}
              <span className="text-brand-gradient">
                Move Your Business Forward.
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : 0.22,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-7 max-w-2xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg"
            >
              From exceptional websites to intelligent automation, we create digital solutions that help businesses build credibility, connect with their audiences and unlock new opportunities.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : 0.34,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={handleExploreServices}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                <span>Explore Our Services</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>

              <button
                type="button"
                onClick={onStartProject}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.04]"
              >
                <span>Let&apos;s Discuss Your Project</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.45,
                ease: EASE_OUT_EXPO,
              }}
              className="mt-10 flex items-center gap-4 border-t border-white/[0.08] pt-6"
            >
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-r from-[#FF2E93] via-[#FF9A1F] to-[#2F6BFF]"
              />
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-[13px]">
                Your Partner for Digital Wins.
              </p>
            </motion.div>
          </div>

          {/* Right Layered Digital Composition */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 18, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: EASE_OUT_EXPO,
            }}
            className="relative lg:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515]">
              <MediaFrame
                src={SERVICES_HERO_MEDIA.image}
                alt={SERVICES_HERO_MEDIA.alt}
                priority
                className="aspect-[16/11] w-full lg:aspect-[4/4.2]"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/80">
                <span>Websites · Automation · Brand</span>
                <span aria-hidden="true" className="text-white/40">
                  /
                </span>
                <span>05 Core Disciplines</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
