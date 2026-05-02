import React from 'react';
import { cn } from '../lib/utils';

/** Inline filter so glow always applies; matches OSTERA AI text-shadow layers */
const LOGO_PURPLE_GLOW =
  'drop-shadow(0 0 10px rgba(139, 92, 246, 0.55)) drop-shadow(0 0 22px rgba(139, 92, 246, 0.35)) drop-shadow(0 0 36px rgba(139, 92, 246, 0.2))';

export default function OsteraLogo({
  className,
  markClassName,
  textClassName,
  showText = false,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative inline-flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-purple-500/20 blur-[15px] rounded-full z-0" />
        <img
          src="/logo/ostera__logo.png"
          alt="Ostera AI logo"
          className={cn('relative z-10 h-11 w-auto object-contain sm:h-12', markClassName)}
          style={{ filter: LOGO_PURPLE_GLOW }}
          draggable="false"
        />
      </div>
      {showText ? (
        <span
          className={cn(
            'font-heading text-lg font-semibold uppercase tracking-[0.14em] text-secondary',
            '[text-shadow:0_0_10px_rgba(139,92,246,0.55),0_0_22px_rgba(139,92,246,0.35),0_0_36px_rgba(139,92,246,0.2)]',
            textClassName
          )}
        >
          OSTERA AI
        </span>
      ) : null}
    </div>
  );
}
