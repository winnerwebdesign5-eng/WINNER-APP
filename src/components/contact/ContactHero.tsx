import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, CalendarCheck, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactPageData';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactHero() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToForm = () => {
    const formTarget = document.getElementById('contact-form');
    if (formTarget) {
      formTarget.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pb-20 pt-14 lg:pb-28 lg:pt-24">
      {/* Subtle decorative gradient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-24 top-6 h-[360px] w-[360px] rounded-full opacity-20 blur-[135px] lg:h-[460px] lg:w-[460px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,46,147,0.45) 0%, rgba(139,61,255,0.25) 55%, transparent 78%)',
          }}
        />
        <div
          className="absolute right-[6%] top-[18%] h-[340px] w-[340px] rounded-full opacity-15 blur-[135px] lg:h-[430px] lg:w-[430px]"
          style={{
            background:
              'radial-gradient(circle, rgba(47,107,255,0.45) 0%, rgba(139,61,255,0.2) 60%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Eyebrow & Availability Row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase sm:text-[13px]">
            Let&apos;s Create Something Meaningful
          </p>

          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-white/90 uppercase">
            <CalendarCheck className="h-3.5 w-3.5 text-[#14E3A8]" strokeWidth={1.75} />
            <span>{CONTACT_INFO.availabilityLabel}</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: prefersReducedMotion ? 0 : 0.08,
            ease: EASE_OUT_EXPO,
          }}
          className="font-display mt-8 max-w-4xl text-[clamp(2.55rem,5.3vw,4.7rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
          style={{ textWrap: 'balance' }}
        >
          Let&apos;s Talk About{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(110deg, #FF2E93 0%, #8B3DFF 52%, #2F6BFF 100%)',
            }}
          >
            Your Next Project.
          </span>
        </motion.h1>

        {/* Supporting Paragraph & Actions */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: prefersReducedMotion ? 0 : 0.22,
            ease: EASE_OUT_EXPO,
          }}
          className="mt-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-base leading-[1.75] text-[#A3A3A3] sm:text-lg">
              Have an idea, a business challenge, or a digital project you&apos;d love to bring to life? We&apos;d love to hear about it. Tell us what you&apos;re working on, and let&apos;s explore how Winner Designs can help you achieve your goals.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleScrollToForm}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                <span>Start a Project</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>

              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 whitespace-nowrap rounded-sm border border-[#14E3A8]/35 bg-[#14E3A8]/[0.07] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#14E3A8]/65 hover:bg-[#14E3A8]/15"
              >
                <MessageCircle className="h-4 w-4 text-[#14E3A8]" strokeWidth={1.75} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p className="text-sm leading-relaxed text-[#A3A3A3]">
              {CONTACT_INFO.heroSupportingLocation}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
