import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ExternalLink,
  Globe,
  Loader2,
  Lock,
  RefreshCw,
  X,
} from 'lucide-react';
import type { FeaturedWebsiteItem } from '../../data/portfolioPageData';

interface FullScreenPreviewProps {
  project: FeaturedWebsiteItem | null;
  onClose: () => void;
}

export function FullScreenPreview({ project, onClose }: FullScreenPreviewProps) {
  const prefersReducedMotion = useReducedMotion();
  const [embedBlocked, setEmbedBlocked] = useState(true);
  const [forceIframeAttempt, setForceIframeAttempt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!project) return;
    setEmbedBlocked(project.blocksIframeEmbedding);
    setForceIframeAttempt(false);
    setIsLoading(!project.blocksIframeEmbedding);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleCspViolation = (event: SecurityPolicyViolationEvent) => {
      if (
        event.violatedDirective?.includes('frame') ||
        event.blockedURI?.includes(project.domain)
      ) {
        setEmbedBlocked(true);
        setForceIframeAttempt(false);
        setIsLoading(false);
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

  const showLiveIframe = !embedBlocked || forceIframeAttempt;

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 lg:p-7"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fullscreen-preview-title"
        >
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Full-Viewport Preview Container */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.985, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.985, y: 10 }
            }
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[92vh] w-full max-w-[1440px] flex-col overflow-hidden rounded-sm border border-white/[0.12] bg-[#0A0A0A] shadow-2xl"
          >
            {/* Top Modal Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#111111] px-4 py-3.5 sm:px-6">
              <div className="flex min-w-0 items-center gap-4">
                <div>
                  <h2
                    id="fullscreen-preview-title"
                    className="font-display truncate text-sm font-semibold tracking-tight text-white sm:text-base"
                  >
                    {project.title}
                  </h2>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#A3A3A3]">
                    <Lock className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{project.domain}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {project.blocksIframeEmbedding && (
                  <button
                    type="button"
                    onClick={() => {
                      if (forceIframeAttempt) {
                        setForceIframeAttempt(false);
                        setEmbedBlocked(true);
                        setIsLoading(false);
                      } else {
                        setEmbedBlocked(false);
                        setForceIframeAttempt(true);
                        setIsLoading(true);
                      }
                    }}
                    className="hidden min-h-[40px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-sm border border-white/15 bg-[#151515] px-3.5 py-2 text-xs font-medium text-[#A3A3A3] transition-colors hover:border-white/30 hover:text-white sm:inline-flex"
                  >
                    <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.6} />
                    <span>
                      {forceIframeAttempt ? 'Direct Notice' : 'Test Live Frame'}
                    </span>
                  </button>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-sm bg-white px-4 py-2 text-xs font-semibold tracking-[0.04em] text-[#0A0A0A] transition-opacity hover:opacity-90"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close full-screen preview"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Viewport Area */}
            <div className="relative flex-1 bg-[#0A0A0A]">
              {showLiveIframe && (
                <iframe
                  src={project.url}
                  title={`${project.title} — Full-Screen Live Preview`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  allow="fullscreen"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setEmbedBlocked(true);
                    setForceIframeAttempt(false);
                    setIsLoading(false);
                  }}
                  className="h-full w-full border-0 bg-white"
                />
              )}

              {showLiveIframe && isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0A0A0A]/90 px-6 text-center backdrop-blur-sm">
                  <Loader2 className="h-6 w-6 animate-spin text-white/80" strokeWidth={1.75} />
                  <p className="text-xs font-medium tracking-[0.16em] text-[#A3A3A3] uppercase">
                    Connecting to {project.domain}
                  </p>
                </div>
              )}

              {!showLiveIframe && (
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0E0E10] p-6 text-center sm:p-12">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '56px 56px',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
                    style={{
                      background: `radial-gradient(circle, ${project.accentFrom} 0%, ${project.accentTo} 65%, transparent 100%)`,
                    }}
                  />

                  <div className="relative z-10 flex max-w-xl flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white">
                      <Globe className="h-6 w-6" strokeWidth={1.6} />
                    </div>

                    <p className="mt-6 text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
                      {project.title} · {project.domain}
                    </p>

                    <h3
                      className="font-display mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
                      style={{ textWrap: 'balance' }}
                    >
                      THIS WEBSITE PREFERS TO OPEN DIRECTLY.
                    </h3>

                    <p className="mt-4 text-base leading-[1.7] text-[#A3A3A3]">
                      Open the original website to experience its complete design and functionality.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[48px] items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-7 py-3.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
                      >
                        <span>OPEN ORIGINAL WEBSITE</span>
                        <ExternalLink
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setEmbedBlocked(false);
                          setForceIframeAttempt(true);
                          setIsLoading(true);
                        }}
                        className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-5 py-3.5 text-xs font-medium tracking-[0.06em] text-white/85 uppercase transition-colors hover:border-white/30 hover:text-white"
                      >
                        <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.6} />
                        <span>Try Live Frame</span>
                      </button>
                    </div>

                    <p className="mt-6 max-w-md text-xs leading-relaxed text-[#A3A3A3]/80">
                      {project.frameRestrictionReason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
