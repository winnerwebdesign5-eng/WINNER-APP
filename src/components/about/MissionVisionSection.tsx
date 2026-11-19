import { motion, useReducedMotion } from 'motion/react';
import { MISSION_VISION } from '../../data/aboutData';

export function MissionVisionSection() {
  const prefersReducedMotion = useReducedMotion();
  const blocks = [MISSION_VISION.mission, MISSION_VISION.vision];

  return (
    <section id="mission-vision" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {blocks.map((block, index) => (
            <motion.article
              key={block.label}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-8 sm:p-10 lg:p-12"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${block.accentFrom}, ${block.accentTo})`,
                }}
              />

              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#A3A3A3] uppercase">
                  {block.label}
                </p>

                <div
                  aria-hidden="true"
                  className="my-6 h-px w-full bg-white/[0.08]"
                />

                <p className="font-display text-xl font-medium leading-[1.55] tracking-[-0.01em] text-white sm:text-2xl">
                  {block.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
