import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  icon?: LucideIcon;
  label: string;
  variant?: 'primary' | 'success' | 'neutral' | 'bronze' | 'silver' | 'gold' | 'platinum';
  className?: string;
}

export function Badge({ icon: Icon, label, variant = 'neutral', className }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-600 border-primary-200',
    success: 'bg-success-100 text-success-600 border-success-200',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    bronze: 'bg-amber-50 text-amber-700 border-amber-200',
    silver: 'bg-gray-100 text-gray-700 border-gray-300',
    gold: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    platinum: 'bg-purple-50 text-purple-700 border-purple-300',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-small font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );
}
