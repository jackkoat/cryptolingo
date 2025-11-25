import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  height?: 'sm' | 'md' | 'lg';
  gradient?: string;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  height = 'md',
  gradient = 'from-purple-500 to-purple-600',
  className,
  showLabel = false,
}) => {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm text-gray-600">
          <span>Progress</span>
          <span className="font-medium">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', heights[height])}>
        <div
          className={cn(
            'h-full bg-gradient-to-r rounded-full transition-all duration-500 ease-out',
            gradient
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
