import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactPageData';

export function ContactFinalCta() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToForm = () => {
    const formTarget = document.getElementById('contact-form');
    if (formTarget) {
      formTarget.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
    window.setTimeout(() => {
      const nameInput = document.getElementById('contact-full-name') as HTMLInputElement | null;
      nameInput?.focus({ preventScroll: true });
    }, prefersReducedMotion ? 50 : 450);
  };

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32">
      {/* Subtle brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[380px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              'linear-gradient(110deg, rgba(255,46,147,0.45) 0%, rgba(139,61,255,0.35) 50%, rgba(47,107,255,0.45) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.24em] text-[#A3A3A3] uppercase">
            {CONTACT_INFO.tagline}
          </p>

          <h2
            className="font-display mt-5 text-[clamp(2.25rem,4.8vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white"
            style={{ textWrap: 'balance' }}
          >
            Your Next Big{' '}
            <span className="text-brand-gradient">Digital Win</span> Starts Here.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.7] text-[#A3A3A3] sm:text-lg">
            Let&apos;s turn your ideas into a digital experience that moves your business forward.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleScrollToForm}
              className="group inline-flex min-h-[52px] cursor-pointer items-center gap-3 whitespace-nowrap rounded-sm bg-white px-8 py-3.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUp
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                strokeWidth={1.85}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
