import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FounderPortraitFrame } from './FounderPortraitFrame';

interface FounderSectionProps {
  onStartProject: () => void;
}

export function FounderSection({ onStartProject }: FounderSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="founder"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left Portrait Column (Stacks on top on mobile) */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <FounderPortraitFrame />
        </motion.div>

        {/* Right Editorial Introduction Column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.75,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="lg:col-span-7"
        >
          <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
            The Creative Mind Behind Winner Designs
          </p>

          <h2
            className="font-display mt-5 text-[clamp(2rem,3.6vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Hello, I&apos;m the Creative Force Behind the Brand.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-[1.78] text-[#A3A3A3] sm:text-[17px]">
            <p>
              I&apos;m passionate about creating digital experiences that help businesses communicate better, stand out and grow. My approach combines creativity, thoughtful design and modern digital tools to turn ideas into meaningful solutions.
            </p>
            <p>
              I believe good design should do more than look beautiful. It should communicate clearly, solve problems and create an experience that makes people confident in the brands they choose.
            </p>
          </div>

          <p className="font-display mt-8 border-t border-white/[0.08] pt-7 text-lg font-medium leading-relaxed text-white sm:text-xl">
            Every project is an opportunity to create something meaningful, functional and memorable.
          </p>

          <div className="mt-9">
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
            >
              <span>Let&apos;s Create Something Great</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
