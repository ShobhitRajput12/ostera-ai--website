import React from 'react';
import { cn } from '../lib/utils';

export default function OsteraLogo({
  className,
  markClassName,
  textClassName,
  showText = true,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src="/logo/ostera-mark.png"
        alt="Ostera AI mark"
        className={cn('h-10 w-10 shrink-0 object-contain', markClassName)}
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
