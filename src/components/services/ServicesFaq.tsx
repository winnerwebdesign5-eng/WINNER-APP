import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { SERVICES_FAQ } from '../../data/servicesPageData';

export function ServicesFaq() {
  const [openId, setOpenId] = useState<string | null>(SERVICES_FAQ[0].id);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Left Sticky Heading */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Frequently Asked Questions
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Questions Before We Get Started?
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.7] text-[#A3A3A3]">
              Clear answers on how we collaborate, structure projects, and integrate modern digital systems.
            </p>
          </div>
        </motion.div>

        {/* Right Accordion Stack */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:col-span-7">
          {SERVICES_FAQ.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-white"
                >
                  <span className="font-display text-lg font-medium tracking-[-0.01em] text-white sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white/80 transition-colors"
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
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 text-[15px] leading-[1.75] text-[#A3A3A3] sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
