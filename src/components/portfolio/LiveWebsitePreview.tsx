import { useEffect, useState } from 'react';
import {
  ExternalLink,
  Globe,
  Loader2,
  Lock,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import type { FeaturedWebsiteItem } from '../../data/portfolioPageData';

interface LiveWebsitePreviewProps {
  project: FeaturedWebsiteItem;
  onOpenFullScreen: (project: FeaturedWebsiteItem) => void;
  heightClassName?: string;
}

export function LiveWebsitePreview({
  project,
  onOpenFullScreen,
  heightClassName = 'h-[430px] sm:h-[500px] lg:h-[560px]',
}: LiveWebsitePreviewProps) {
  const [embedBlocked, setEmbedBlocked] = useState<boolean>(
    project.blocksIframeEmbedding
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !project.blocksIframeEmbedding
  );
  const [forceIframeAttempt, setForceIframeAttempt] = useState(false);

  useEffect(() => {
    const handleCspViolation = (event: SecurityPolicyViolationEvent) => {
      if (
        event.violatedDirective?.includes('frame') ||
        event.blockedURI?.includes(project.domain)
      ) {
        setEmbedBlocked(true);
        setIsLoading(false);
        setForceIframeAttempt(false);
      }
    };

    window.addEventListener('securitypolicyviolation', handleCspViolation);
    return () => {
      window.removeEventListener('securitypolicyviolation', handleCspViolation);
    };
  }, [project.domain]);

  const handleTryEmbed = () => {
    setEmbedBlocked(false);
    setForceIframeAttempt(true);
    setIsLoading(true);
  };

  const handleShowDirectNotice = () => {
    setForceIframeAttempt(false);
    setEmbedBlocked(true);
    setIsLoading(false);
  };

  const showLiveIframe = !embedBlocked || forceIframeAttempt;

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515] shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
      {/* Subtle top gradient hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] opacity-80"
        style={{
          backgroundImage: `linear-gradient(90deg, ${project.accentFrom}, ${project.accentTo})`,
        }}
      />

      {/* Realistic Desktop Browser Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#111111] px-4 py-3 sm:px-5">
        {/* Window controls + Domain Address Bar */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-sm border border-white/[0.08] bg-[#0A0A0A] px-3 py-1.5 sm:max-w-md">
            <Lock className="h-3 w-3 shrink-0 text-[#A3A3A3]" strokeWidth={1.75} />
            <span className="truncate text-xs font-medium tracking-wide text-white/85">
              {project.domain}
            </span>
          </div>
        </div>

        {/* Browser Bar Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {project.blocksIframeEmbedding && (
            <button
              type="button"
              onClick={
                forceIframeAttempt ? handleShowDirectNotice : handleTryEmbed
              }
              className="hidden min-h-[34px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-sm border border-white/10 bg-[#151515] px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#A3A3A3] transition-colors hover:border-white/25 hover:text-white sm:inline-flex"
            >
              <RefreshCw className="h-3 w-3" strokeWidth={1.75} />
              <span>
                {forceIframeAttempt ? 'Direct Notice' : 'Test Embed'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenFullScreen(project)}
            aria-label={`Open full-screen preview of ${project.title}`}
            className="inline-flex min-h-[34px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Full Screen</span>
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} in a new browser tab`}
            className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap rounded-sm bg-white px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
          >
            <span className="hidden sm:inline">Open Site</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      {/* Browser Viewport Area */}
      <div className={`relative w-full bg-[#0A0A0A] ${heightClassName}`}>
        {/* Original Website Iframe */}
        {showLiveIframe && (
          <iframe
            src={project.url}
            title={`${project.title} — Live Website Preview`}
            loading="lazy"
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

        {/* Loading Overlay while Iframe Resolves */}
        {showLiveIframe && isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0A0A0A]/90 px-6 text-center backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-white/80" strokeWidth={1.75} />
            <p className="text-xs font-medium tracking-[0.16em] text-[#A3A3A3] uppercase">
              Loading {project.domain}
            </p>
          </div>
        )}

        {/* Polished Blocked-Embedding Fallback State */}
        {!showLiveIframe && (
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0F0F10] p-6 text-center sm:p-10">
            {/* Subtle architectural grid backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Controlled gradient illumination */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[110px]"
              style={{
                background: `radial-gradient(circle, ${project.accentFrom} 0%, ${project.accentTo} 60%, transparent 100%)`,
              }}
            />

            <div className="relative z-10 flex max-w-lg flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white/90">
                <Globe className="h-5 w-5" strokeWidth={1.6} />
              </div>

              <p className="mt-5 text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
                {project.domain}
              </p>

              <h4
                className="font-display mt-3 text-xl font-semibold tracking-[-0.015em] text-white sm:text-2xl"
                style={{ textWrap: 'balance' }}
              >
                THIS WEBSITE PREFERS TO OPEN DIRECTLY.
              </h4>

              <p className="mt-3 text-sm leading-[1.7] text-[#A3A3A3] sm:text-base">
                Open the original website to experience its complete design and functionality.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[46px] items-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-6 py-3 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
                >
                  <span>OPEN ORIGINAL WEBSITE</span>
                  <ExternalLink
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </a>

                <button
                  type="button"
                  onClick={handleTryEmbed}
                  className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-5 py-3 text-xs font-medium tracking-[0.06em] text-white/85 uppercase transition-colors hover:border-white/30 hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.6} />
                  <span>Try Live Frame</span>
                </button>
              </div>

              <p className="mt-5 max-w-md text-xs leading-relaxed text-[#A3A3A3]/75">
                {project.frameRestrictionReason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
