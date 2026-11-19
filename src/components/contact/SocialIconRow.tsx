import { ArrowUpRight } from 'lucide-react';
import {
  CONFIGURABLE_SOCIALS,
  type ConfigurableSocialLink,
} from '../../data/contactPageData';

function SocialPlatformIcon({ id }: { id: ConfigurableSocialLink['id'] }) {
  switch (id) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 11v5M8 8v.01M12 16v-5c0-1.5 1-2.5 2.5-2.5S17 9.5 17 11v5" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
  }
}

interface SocialIconRowProps {
  variant?: 'cards' | 'compact';
}

export function SocialIconRow({ variant = 'cards' }: SocialIconRowProps) {
  if (variant === 'compact') {
    return (
      <ul className="mt-5 space-y-2.5">
        {CONFIGURABLE_SOCIALS.map((social) =>
          social.url ? (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.brandName} on ${social.label}`}
                className="inline-flex items-center gap-2 text-sm text-[#A3A3A3] transition-colors duration-200 hover:text-white"
              >
                <SocialPlatformIcon id={social.id} />
                <span>{social.label}</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" strokeWidth={1.5} />
              </a>
            </li>
          ) : (
            <li
              key={social.id}
              title={`${social.brandName} · ${social.label} profile URL configurable`}
              className="inline-flex w-full items-center gap-2 text-sm text-[#A3A3A3]/75"
            >
              <SocialPlatformIcon id={social.id} />
              <span>{social.label}</span>
            </li>
          )
        )}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {CONFIGURABLE_SOCIALS.map((social) => {
        const innerContent = (
          <>
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/85">
                <SocialPlatformIcon id={social.id} />
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-white">
                  {social.label}
                </span>
                <span className="block text-[11px] text-[#A3A3A3]">
                  {social.brandName}
                </span>
              </span>
            </span>
            {social.url ? (
              <ArrowUpRight
                className="h-3.5 w-3.5 text-white/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                strokeWidth={1.75}
              />
            ) : (
              <span className="text-[10px] tracking-[0.08em] text-[#A3A3A3]/70 uppercase">
                Soon
              </span>
            )}
          </>
        );

        return social.url ? (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.brandName} on ${social.label}`}
            className="group flex min-h-[54px] items-center justify-between rounded-sm border border-white/[0.08] bg-[#151515] px-4 py-2.5 transition-colors duration-200 hover:border-white/25"
          >
            {innerContent}
          </a>
        ) : (
          <div
            key={social.id}
            aria-label={`${social.brandName} ${social.label} placeholder`}
            className="flex min-h-[54px] items-center justify-between rounded-sm border border-white/[0.06] bg-[#151515]/70 px-4 py-2.5"
          >
            {innerContent}
          </div>
        );
      })}
    </div>
  );
}
