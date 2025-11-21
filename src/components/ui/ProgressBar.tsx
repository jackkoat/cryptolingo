import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: 'primary' | 'success';
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max,
  variant = 'primary',
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const fillColors = {
    primary: 'bg-gradient-to-r from-primary-500 via-primary-400 to-purple-500',
    success: 'bg-gradient-to-r from-success-500 via-success-400 to-emerald-400',
  };

  const glowColors = {
    primary: 'shadow-glow-purple',
    success: 'shadow-glow-green',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-small text-neutral-600 mb-2">
          <span className="font-medium">{value} / {max}</span>
          <span className="font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden relative">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-celebration ease-out relative',
            fillColors[variant],
            percentage > 0 ? glowColors[variant] : ''
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect on progress bar */}
          {percentage > 0 && percentage < 100 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
