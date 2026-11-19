import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/agencyData';
import { MediaFrame } from './MediaFrame';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export function PortfolioSection({ onSelectProject }: PortfolioSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="portfolio" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Portfolio Preview
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Selected Work. Bigger Possibilities.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#A3A3A3] sm:text-base">
            Curated concept explorations showcasing how visual direction, interface precision, and technical systems work together.
          </p>
        </motion.div>

        {/* Asymmetric 3-Card Showcase */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] transition-colors duration-200 hover:border-white/20 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Visual Preview */}
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`Explore ${project.title}`}
                className="relative block w-full cursor-pointer overflow-hidden text-left"
              >
                <MediaFrame
                  src={project.image}
                  alt={project.imageAlt}
                  className={
                    project.featured
                      ? 'aspect-[16/9] w-full lg:aspect-[21/10]'
                      : 'aspect-[4/3] w-full'
                  }
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151515]/80 via-transparent to-transparent"
                />
              </button>

              {/* Editorial Card Footer */}
              <div className="flex flex-1 flex-col justify-between p-7 lg:p-9">
                <div>
                  {/* Unboxed metadata with subtle separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.08em] text-[#A3A3A3] uppercase">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.studyType}</span>
                  </div>

                  <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                    <div className="max-w-2xl">
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[26px]">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-[1.68] text-[#A3A3A3]">
                        {project.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 self-start whitespace-nowrap border-b border-white/25 pb-1 text-xs font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:border-white lg:self-end"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
