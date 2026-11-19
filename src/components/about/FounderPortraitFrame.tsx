import { FOUNDER_PORTRAIT } from '../../data/aboutData';

export function FounderPortraitFrame() {
  return (
    <div className="group relative">
      {/* Subtle ambient illumination behind portrait frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-2xl opacity-35 blur-2xl transition-opacity duration-500 group-hover:opacity-55"
        style={{
          background:
            'radial-gradient(circle at 25% 20%, rgba(255,46,147,0.28) 0%, rgba(139,61,255,0.22) 45%, rgba(47,107,255,0.2) 80%, transparent 100%)',
        }}
      />

      {/* Gradient border wrapper */}
      <div className="relative rounded-2xl bg-gradient-to-br from-white/20 via-white/[0.07] to-[#8B3DFF]/30 p-px shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:from-[#FF2E93]/45 group-hover:via-white/20 group-hover:to-[#2F6BFF]/45">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[15px] bg-[#111111]">
          <img
            src={FOUNDER_PORTRAIT.src}
            alt={FOUNDER_PORTRAIT.alt}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Subtle bottom vignette masking for floating label legibility */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/45 to-transparent"
          />

          {/* Small floating brand label */}
          <div className="absolute bottom-5 left-5 right-5 z-10 rounded-lg border border-white/15 bg-[#0A0A0A]/75 px-4 py-3 backdrop-blur-md">
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-white uppercase">
              {FOUNDER_PORTRAIT.floatingTitle}
            </p>
            <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-[#A3A3A3] uppercase">
              {FOUNDER_PORTRAIT.floatingSubtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
