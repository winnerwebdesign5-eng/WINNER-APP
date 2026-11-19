import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#151515] ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#151515] via-[#111111] to-[#1A1625] p-8 text-center"
        >
          <div className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.03] text-white/70">
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <p className="max-w-xs text-xs font-medium tracking-wide text-[#A3A3A3]">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}
