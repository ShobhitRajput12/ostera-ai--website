import React from 'react';
import { cn } from '../lib/utils';

export default function OsteraLogo({
  className,
  markClassName,
  textClassName,
  showText = false,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src="/logo/ostera__logo_horizontal.png"
        alt="Ostera AI logo"
        className={cn('h-11 w-auto shrink-0 object-contain sm:h-12', markClassName)}
        draggable="false"
      />
      {showText ? (
        <span
          className={cn(
            'font-heading text-lg font-semibold uppercase tracking-[0.14em] text-white',
            textClassName
          )}
        >
          Ostera AI
        </span>
      ) : null}
    </div>
  );
}
