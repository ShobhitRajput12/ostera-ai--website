import React from 'react';
import { cn } from '../lib/utils';

/** Inline filter so glow always applies; matches OSTERA AI text-shadow layers */
const LOGO_PURPLE_GLOW =
  'drop-shadow(0 0 12px rgba(139, 92, 246, 0.72)) drop-shadow(0 0 26px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 42px rgba(139, 92, 246, 0.3))';

export default function OsteraLogo({
  className,
  markClassName,
  textClassName,
  showText = false,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative inline-flex items-center justify-center shrink-0">
        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-[18px] z-0" />
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
            'text-violet-400',
            '[text-shadow:0_0_12px_rgba(139,92,246,0.75),0_0_24px_rgba(139,92,246,0.5),0_0_40px_rgba(139,92,246,0.28)]',
            textClassName
          )}
        >
          OSTERA AI
        </span>
      ) : null}
    </div>
  );
}
