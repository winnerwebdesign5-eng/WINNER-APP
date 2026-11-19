import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ABOUT_MEDIA } from '../data/agencyData';
import { MediaFrame } from './MediaFrame';

interface AboutSectionProps {
  onDiscoverAbout?: () => void;
}

export function AboutSection({ onDiscoverAbout }: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleDiscoverClick = () => {
    if (onDiscoverAbout) {
      onDiscoverAbout();
      return;
    }
    const target = document.querySelector('#why-us');
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="about" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left Editorial Column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between lg:col-span-6 lg:py-4"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              About Winner Designs
            </p>
            <h2
              className="font-display mt-5 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              We Turn Digital Ideas Into{' '}
              <span className="text-brand-gradient">Impact.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.75] text-[#A3A3A3] sm:text-[17px]">
              At Winner Designs, we combine creative thinking, thoughtful design and modern technology to help businesses build stronger digital experiences. From compelling websites to intelligent automation, we create solutions designed around real business goals.
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <button
                type="button"
                onClick={handleDiscoverClick}
                className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/35 hover:bg-white hover:text-[#0A0A0A]"
              >
                <span>Discover Winner Designs</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </button>

              <p className="text-xs tracking-[0.06em] text-[#A3A3A3]">
                Creativity · Clarity · Precision
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Abstract Creativity & Technology Visual */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="group relative h-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515]">
            <MediaFrame
              src={ABOUT_MEDIA.image}
              alt={ABOUT_MEDIA.alt}
              className="aspect-[4/3] h-full w-full"
              imgClassName="lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/55 via-transparent to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
