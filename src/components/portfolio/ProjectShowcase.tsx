import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, Maximize2 } from 'lucide-react';
import {
  FEATURED_WEBSITES,
  type FeaturedWebsiteItem,
} from '../../data/portfolioPageData';
import { LiveWebsitePreview } from './LiveWebsitePreview';

interface ProjectShowcaseProps {
  onOpenFullScreen: (project: FeaturedWebsiteItem) => void;
}

export function ProjectShowcase({ onOpenFullScreen }: ProjectShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="featured-websites"
      className="border-t border-white/[0.08] bg-[#111111] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Heading */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Winner Designs · Portfolio
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Selected Websites. Distinct Experiences.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
            Explore these featured digital experiences and interact with the original websites directly.
          </p>
        </motion.div>

        {/* Two Distinct Asymmetric Website Showcases */}
        <div className="mt-16 space-y-24 lg:space-y-32">
          {FEATURED_WEBSITES.map((project, index) => {
            const isEditorialTopLayout = index === 0;

            return (
              <motion.article
                key={project.id}
                id={`showcase-${project.id}`}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-24"
              >
                {isEditorialTopLayout ? (
                  /* Project 01 Asymmetric Layout: Editorial Header Split Above Full-Width Browser Showcase */
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                      <div className="lg:col-span-6">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#A3A3A3] uppercase">
                          <span className="font-display text-white tabular-nums">
                            {project.number}
                          </span>
                          <span aria-hidden="true">/</span>
                          <span>{project.category}</span>
                        </div>

                        <h3 className="font-display mt-3 text-[clamp(2rem,3.4vw,2.9rem)] font-semibold tracking-[-0.025em] text-white">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-xs tracking-[0.06em] text-[#A3A3A3]">
                          {project.attribution} · {project.domain}
                        </p>
                      </div>

                      <div className="lg:col-span-6">
                        <p className="text-base leading-[1.75] text-[#A3A3A3]">
                          {project.description}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3.5">
                          <button
                            type="button"
                            onClick={() => onOpenFullScreen(project)}
                            className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
                          >
                            <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                            <span>Live Preview</span>
                          </button>

                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08]"
                          >
                            <span>Visit Live Website</span>
                            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <LiveWebsitePreview
                      project={project}
                      onOpenFullScreen={onOpenFullScreen}
                      heightClassName="h-[430px] sm:h-[520px] lg:h-[580px]"
                    />
                  </div>
                ) : (
                  /* Project 02 Asymmetric Layout: 4-Col Editorial Sidebar + 8-Col Expansive Browser Preview */
                  <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-4 lg:pt-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.14em] text-[#A3A3A3] uppercase">
                        <span className="font-display text-white tabular-nums">
                          {project.number}
                        </span>
                        <span aria-hidden="true">/</span>
                        <span>{project.category}</span>
                      </div>

                      <h3 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs tracking-[0.06em] text-[#A3A3A3]">
                        {project.attribution} · {project.domain}
                      </p>

                      <p className="mt-6 text-base leading-[1.75] text-[#A3A3A3]">
                        {project.description}
                      </p>

                      <div className="mt-7 border-t border-white/[0.08] pt-5">
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                          Experience Focus
                        </p>
                        <ul className="mt-3 space-y-2">
                          {project.highlights.map((item) => (
                            <li key={item} className="text-sm text-[#A3A3A3]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <button
                          type="button"
                          onClick={() => onOpenFullScreen(project)}
                          className="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
                        >
                          <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                          <span>Live Preview</span>
                        </button>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08]"
                        >
                          <span>Visit Live Website</span>
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-8">
                      <LiveWebsitePreview
                        project={project}
                        onOpenFullScreen={onOpenFullScreen}
                        heightClassName="h-[430px] sm:h-[520px] lg:h-[580px]"
                      />
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
