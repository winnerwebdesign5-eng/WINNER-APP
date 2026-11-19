import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { CONTACT_FAQ_ITEMS } from '../../data/contactPageData';

export function ContactFaq() {
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(CONTACT_FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="contact-faq"
      className="border-t border-white/[0.08] bg-[#111111] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-[#A3A3A3] uppercase">
              Frequently Asked Questions
            </p>
            <h2
              className="font-display mt-3 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Got Questions?{' '}
              <span className="text-[#A3A3A3]">We Have Answers.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.7] text-[#A3A3A3]">
              Everything you need to know about starting a project with Winner Designs, timelines, budgets, and working together remotely.
            </p>
          </motion.div>

          {/* Right Accordion */}
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:col-span-7">
            {CONTACT_FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${item.id}-panel`;
              const buttonId = `${item.id}-button`;

              return (
                <div key={item.id} className="py-1">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="group flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-xs font-medium tracking-[0.16em] text-[#A3A3A3] tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-lg font-medium tracking-[-0.01em] text-white transition-colors group-hover:text-white sm:text-xl">
                        {item.question}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 ${
                        isOpen
                          ? 'border-white/30 bg-white text-[#0A0A0A]'
                          : 'border-white/15 bg-[#151515] text-white group-hover:border-white/30'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={1.75} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.75} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { height: 'auto', opacity: 1 }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-9 pr-4 sm:pr-12">
                          <p className="text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
