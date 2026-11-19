import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/agencyData';
import { MediaFrame } from './MediaFrame';

interface HeroProps {
  onStartProject: (defaultService?: string) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ onStartProject }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 72]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -48]);

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const firstLineWords = ['Your', 'Partner'];
  const secondLineWords = ['for', 'Digital', 'Wins.'];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-72px)] flex-col justify-between overflow-hidden bg-[#0A0A0A] pb-8 pt-10 lg:pb-12 lg:pt-16"
    >
      {/* Subtle floating ambient illumination */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-24 top-12 h-[380px] w-[380px] rounded-full opacity-20 blur-[130px] lg:h-[460px] lg:w-[460px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.45) 0%, rgba(139,61,255,0.22) 55%, transparent 75%)',
          }}
        />
        <div
          className="absolute right-[8%] top-[18%] h-[340px] w-[340px] rounded-full opacity-15 blur-[130px] lg:h-[440px] lg:w-[440px]"
          style={{
            background:
              'radial-gradient(circle, rgba(47,107,255,0.45) 0%, rgba(255,154,31,0.2) 60%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* Main Hero Grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Left Editorial Column */}
        <div className="flex flex-col items-start lg:col-span-7">
          {/* Introductory label */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mb-6 text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase sm:text-[13px]"
          >
            Creative Digital Agency
          </motion.p>

          {/* Dominant Headline with staggered word reveal */}
          <h1
            className="font-display max-w-3xl text-[clamp(2.65rem,5.4vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-white"
            style={{ textWrap: 'balance' }}
          >
            <span className="block">
              {firstLineWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: prefersReducedMotion ? 0 : 0.08 + index * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="mr-[0.26em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 block">
              {secondLineWords.map((word, index) => {
                const isGradientWord = word === 'Digital' || word === 'Wins.';
                return (
                  <motion.span
                    key={word}
                    initial={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : 0.24 + index * 0.09,
                      ease: EASE_OUT_EXPO,
                    }}
                    className={`mr-[0.26em] inline-block ${
                      isGradientWord ? 'text-brand-gradient' : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          {/* Supporting paragraph */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: prefersReducedMotion ? 0 : 0.52,
              ease: EASE_OUT_EXPO,
            }}
            className="mt-7 max-w-xl text-base leading-[1.7] text-[#A3A3A3] sm:text-lg"
          >
            We design exceptional digital experiences, build powerful websites and create intelligent solutions that help businesses stand out, connect with customers and grow.
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: prefersReducedMotion ? 0 : 0.66,
              ease: EASE_OUT_EXPO,
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => onStartProject()}
              className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
            >
              <span>Let's Build Something Great</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('#portfolio')}
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.04]"
            >
              <span>Explore Our Work</span>
            </button>
          </motion.div>
        </div>

        {/* Right Architectural Visual with gentle parallax */}
        <motion.div
          style={{ y: mediaY }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : 0.28, ease: EASE_OUT_EXPO }}
          className="relative lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#111111]">
            <MediaFrame
              src={HERO_MEDIA.image}
              alt={HERO_MEDIA.alt}
              priority
              className="aspect-[16/10] w-full lg:aspect-[4/4.3]"
              imgClassName="object-center transition-transform duration-700 hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/65 via-transparent to-transparent"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/75">
              <span>Winner Designs Studio</span>
              <span aria-hidden="true" className="text-white/40">
                /
              </span>
              <span>Digital Craft &amp; Systems</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.85 }}
        className="relative z-10 mx-auto mt-10 flex w-full max-w-7xl items-center justify-between px-6 lg:mt-14 lg:px-10"
      >
        <button
          type="button"
          onClick={() => scrollToSection('#trust')}
          className="group inline-flex cursor-pointer items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A3A3A3] uppercase transition-colors duration-200 hover:text-white"
        >
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <motion.span
              animate={
                prefersReducedMotion
                  ? { y: 0 }
                  : { y: [0, 10, 0], opacity: [1, 0.35, 1] }
              }
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-white"
            />
          </span>
          <span>Scroll to explore</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={1.5} />
        </button>

        <span className="hidden text-xs text-[#A3A3A3]/70 sm:inline">
          Design · Automation · Growth
        </span>
      </motion.div>
    </section>
  );
}
