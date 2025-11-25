import { FC } from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  gradient?: string;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  icon,
  label,
  value,
  gradient = 'from-purple-500 to-purple-600',
  className,
}) => {
  return (
    <Card className={cn('p-6', className)} hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={cn(
            'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg',
            gradient
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};
