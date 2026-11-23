import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  Eye,
  Globe,
  Image as ImageIcon,
  Loader2,
  Lock,
} from 'lucide-react';
import { subscribeToPublishedProjects } from '../../services/portfolioProjectsService';
import type { AdminPortfolioProject } from '../../types/portfolioProject';

interface AdminProjectsSectionProps {
  onSelectProject: (project: AdminPortfolioProject) => void;
}

const CARD_ACCENTS = [
  { from: '#FF2E93', to: '#FF9A1F' },
  { from: '#8B3DFF', to: '#2F6BFF' },
  { from: '#18C8F0', to: '#14E3A8' },
  { from: '#FF4B4B', to: '#FFC933' },
];

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

interface UploadedProjectCardProps {
  project: AdminPortfolioProject;
  index: number;
  onSelectProject: (project: AdminPortfolioProject) => void;
}

function UploadedProjectCard({
  project,
  index,
  onSelectProject,
}: UploadedProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [liveFrameActive, setLiveFrameActive] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const domain = extractDomain(project.liveUrl);

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515]"
    >
      {/* Top Gradient Accent */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] opacity-80"
        style={{
          backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        }}
      />

      {/* Browser-Framed Live Preview Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#111111] px-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="hidden items-center gap-1 sm:flex" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-sm border border-white/[0.08] bg-[#0A0A0A] px-2.5 py-1 text-[11px] text-white/80">
            <Lock className="h-2.5 w-2.5 shrink-0 text-[#A3A3A3]" strokeWidth={1.75} />
            <span className="truncate">{domain}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (liveFrameActive) {
                setLiveFrameActive(false);
              } else {
                setLiveFrameActive(true);
                if (!iframeBlocked) setIframeLoading(true);
              }
            }}
            className={`inline-flex min-h-[30px] cursor-pointer items-center gap-1 rounded-sm border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              liveFrameActive
                ? 'border-white bg-white text-[#0A0A0A]'
                : 'border-white/15 bg-[#151515] text-[#A3A3A3] hover:border-white/30 hover:text-white'
            }`}
          >
            {liveFrameActive ? (
              <>
                <ImageIcon className="h-3 w-3" strokeWidth={1.75} />
                <span>Thumbnail</span>
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" strokeWidth={1.75} />
                <span>Live Frame</span>
              </>
            )}
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.projectName} live website`}
            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-white/15 bg-[#151515] text-white/85 transition-colors hover:border-white/35 hover:text-white"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      {/* Live Preview Viewport (Thumbnail or Interactive Live Website Frame) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.08] bg-[#0A0A0A]">
        {!liveFrameActive ? (
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            aria-label={`Preview ${project.projectName} project details`}
            className="block h-full w-full cursor-pointer text-left"
          >
            <img
              src={project.thumbnailUrl}
              alt={`${project.projectName} — ${project.title}`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/25 to-transparent"
            />
            <span className="pointer-events-none absolute bottom-3 left-4 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase">
              Live Preview · {project.projectName}
            </span>
          </button>
        ) : iframeBlocked ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <Globe className="h-6 w-6 text-white/70" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-semibold text-white">
              {domain} restricts embedded previewing
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[38px] items-center gap-2 rounded-sm bg-white px-4 py-2 text-xs font-semibold tracking-[0.06em] text-[#0A0A0A] uppercase"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        ) : (
          <>
            <iframe
              src={project.liveUrl}
              title={`${project.projectName} — Live Preview`}
              loading="lazy"
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
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0A0A0A]/85 backdrop-blur-sm">
                <Loader2 className="h-5 w-5 animate-spin text-white" strokeWidth={1.75} />
                <p className="text-[11px] tracking-[0.14em] text-[#A3A3A3] uppercase">
                  Loading {domain}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
            <span>{project.projectName}</span>
            <span>{project.category}</span>
          </div>

          <h3 className="font-display mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-[1.7] text-[#A3A3A3]">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100"
          >
            <span>See Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-white/35 hover:bg-white/[0.08]"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function AdminProjectsSection({ onSelectProject }: AdminProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [projects, setProjects] = useState<AdminPortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPublishedProjects(
      (items) => {
        setProjects(items);
        setLoading(false);
        setLoadError(null);
      },
      (err) => {
        setLoadError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading || loadError || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="uploaded-projects"
      className="border-t border-white/[0.08] bg-[#0A0A0A] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Client Work & Case Studies
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2rem,3.6vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
              style={{ textWrap: 'balance' }}
            >
              More Live Projects. Real Challenges Solved.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-[1.75] text-[#A3A3A3] sm:text-base">
            Preview live project thumbnails, inspect the challenge and approach behind each build, or open the live website directly.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <UploadedProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
