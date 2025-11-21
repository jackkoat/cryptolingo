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
    primary: 'bg-primary-500',
    success: 'bg-success-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-small text-neutral-700 mb-2">
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-celebration ease-out', fillColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
