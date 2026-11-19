import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { PortfolioProject } from '../data/agencyData';
import { MediaFrame } from './MediaFrame';

interface ProjectPreviewModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onStartSimilar: (category: string) => void;
}

export function ProjectPreviewModal({
  project,
  onClose,
  onStartSimilar,
}: ProjectPreviewModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-white/[0.1] bg-[#151515]"
          >
            <div className="relative">
              <MediaFrame
                src={project.image}
                alt={project.imageAlt}
                className="aspect-[16/9] w-full"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/15 bg-[#0A0A0A]/80 text-white backdrop-blur-md transition-colors hover:bg-[#0A0A0A]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.1em] text-[#A3A3A3] uppercase">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.studyType}</span>
              </div>

              <h2
                id="project-modal-title"
                className="font-display mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
              >
                {project.title}
              </h2>

              <p className="mt-4 text-base leading-[1.7] text-[#A3A3A3]">
                {project.overview}
              </p>

              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <p className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
                  Focus Areas
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="border-t border-white/[0.08] pt-3 text-sm text-[#A3A3A3]"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartSimilar(project.category);
                  }}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm bg-white px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
                >
                  <span>Discuss a Similar Project</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] cursor-pointer items-center px-4 py-2 text-sm text-[#A3A3A3] transition-colors hover:text-white"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
