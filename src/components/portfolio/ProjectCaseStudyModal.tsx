import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  Eye,
  Globe,
  Image as ImageIcon,
  Loader2,
  Lock,
  X,
} from 'lucide-react';
import type { AdminPortfolioProject } from '../../types/portfolioProject';

interface ProjectCaseStudyModalProps {
  project: AdminPortfolioProject | null;
  onClose: () => void;
  onStartSimilar: (category: string) => void;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function ProjectCaseStudyModal({
  project,
  onClose,
  onStartSimilar,
}: ProjectCaseStudyModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [previewMode, setPreviewMode] = useState<'thumbnail' | 'live'>('thumbnail');
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  useEffect(() => {
    if (!project) return;
    setPreviewMode('thumbnail');
    setIframeLoading(false);
    setIframeBlocked(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const domain = extractDomain(project.liveUrl);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const handleCspViolation = (event: SecurityPolicyViolationEvent) => {
      if (
        event.violatedDirective?.includes('frame') ||
        event.blockedURI?.includes(domain)
      ) {
        setIframeBlocked(true);
        setIframeLoading(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('securitypolicyviolation', handleCspViolation);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('securitypolicyviolation', handleCspViolation);
    };
  }, [project, onClose]);

  const domain = project ? extractDomain(project.liveUrl) : '';

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: 12 }
            }
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-sm border border-white/[0.12] bg-[#111111]"
          >
            {/* Top Gradient Accent */}
            <span
              aria-hidden="true"
              className="pointer-events-none block h-[2px] w-full"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FF2E93, #FF9A1F, #8B3DFF, #2F6BFF)',
              }}
            />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#A3A3A3] uppercase">
                  {project.projectName} · {project.category}
                </p>
                <h2
                  id="case-study-modal-title"
                  className="font-display mt-2 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-sm bg-white px-4 py-2 text-xs font-semibold tracking-[0.06em] text-[#0A0A0A] uppercase transition-opacity hover:opacity-90"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white transition-colors hover:border-white/30"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-8 p-6 sm:p-8">
              {/* Browser-Framed Live Preview */}
              <div className="overflow-hidden rounded-sm border border-white/[0.1] bg-[#0A0A0A]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#151515] px-4 py-2.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <div className="flex min-w-0 items-center gap-2 rounded-sm border border-white/[0.08] bg-[#0A0A0A] px-3 py-1 text-xs text-white/85">
                      <Lock className="h-3 w-3 shrink-0 text-[#A3A3A3]" strokeWidth={1.75} />
                      <span className="truncate">{domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('thumbnail')}
                      className={`inline-flex min-h-[32px] cursor-pointer items-center gap-1.5 rounded-sm border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                        previewMode === 'thumbnail'
                          ? 'border-white bg-white text-[#0A0A0A]'
                          : 'border-white/15 bg-transparent text-[#A3A3A3] hover:text-white'
                      }`}
                    >
                      <ImageIcon className="h-3 w-3" strokeWidth={1.75} />
                      <span>Thumbnail</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewMode('live');
                        if (!iframeBlocked) setIframeLoading(true);
                      }}
                      className={`inline-flex min-h-[32px] cursor-pointer items-center gap-1.5 rounded-sm border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                        previewMode === 'live'
                          ? 'border-white bg-white text-[#0A0A0A]'
                          : 'border-white/15 bg-transparent text-[#A3A3A3] hover:text-white'
                      }`}
                    >
                      <Eye className="h-3 w-3" strokeWidth={1.75} />
                      <span>Interactive Frame</span>
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full bg-[#0A0A0A]">
                  {previewMode === 'thumbnail' ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={`${project.projectName} — ${project.title}`}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : iframeBlocked ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <Globe className="h-8 w-8 text-white/70" strokeWidth={1.5} />
                      <p className="font-display mt-4 text-lg font-semibold text-white">
                        {domain} blocks embedded framing
                      </p>
                      <p className="mt-2 max-w-md text-sm text-[#A3A3A3]">
                        You can view the full live experience directly in a new browser tab.
                      </p>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase"
                      >
                        <span>Open Live Website</span>
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </a>
                    </div>
                  ) : (
                    <>
                      <iframe
                        src={project.liveUrl}
                        title={`${project.projectName} — Live Preview`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setIframeLoading(false)}
                        onError={() => {
                          setIframeBlocked(true);
                          setIframeLoading(false);
                        }}
                        className="h-full w-full border-0 bg-white"
                      />
                      {iframeLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0A0A0A]/85 backdrop-blur-sm">
                          <Loader2 className="h-6 w-6 animate-spin text-white" strokeWidth={1.75} />
                          <p className="text-xs font-medium tracking-[0.16em] text-[#A3A3A3] uppercase">
                            Loading {domain}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <div className="rounded-sm border border-white/[0.08] bg-[#151515] p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#A3A3A3] uppercase">
                  Project Description
                </p>
                <p className="mt-3 whitespace-pre-line text-base leading-[1.75] text-white/90">
                  {project.description}
                </p>
              </div>

              {/* Challenge Faced & My Approach */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-6">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #FF2E93, #FF9A1F)',
                    }}
                  />
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#FF9A1F] uppercase">
                    Challenge Faced
                  </p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
                    {project.challenge}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-6">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #8B3DFF, #14E3A8)',
                    }}
                  />
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#14E3A8] uppercase">
                    My Approach
                  </p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                <p className="text-xs tracking-[0.14em] text-[#A3A3A3] uppercase">
                  Winner Designs · Selected Project Case Study
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-white/35"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const category = project.category;
                      onClose();
                      onStartSimilar(category);
                    }}
                    className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-sm bg-white px-6 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-opacity hover:opacity-90"
                  >
                    <span>Start a Similar Project</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
