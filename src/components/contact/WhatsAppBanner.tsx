import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactPageData';

export function WhatsAppBanner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="whatsapp-conversion"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#0A0A0A] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515] p-8 sm:p-12 lg:p-14"
        >
          {/* Subtle WhatsApp-inspired mint-teal & blue ambient illumination */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[110px]"
            style={{
              background:
                'radial-gradient(circle, rgba(20,227,168,0.5) 0%, rgba(24,200,240,0.28) 55%, transparent 100%)',
            }}
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              backgroundImage: 'linear-gradient(90deg, #14E3A8, #18C8F0, #2F6BFF)',
            }}
          />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-[#14E3A8] uppercase">
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                <span>Direct Messaging</span>
              </div>

              <h2
                className="font-display mt-4 text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
                style={{ textWrap: 'balance' }}
              >
                Prefer a Quick Conversation?
              </h2>

              <p className="mt-4 text-base leading-[1.7] text-[#A3A3A3] sm:text-lg">
                Let&apos;s skip the long forms. Send us a message on WhatsApp and tell us what you have in mind.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[52px] items-center gap-3 whitespace-nowrap rounded-sm bg-[#14E3A8] px-7 py-3.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#19F2B4]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                <span>Let&apos;s Chat on WhatsApp</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
