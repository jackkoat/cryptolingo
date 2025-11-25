import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  glass = false,
  hover = false,
}) => {
  const baseStyles = 'rounded-2xl shadow-lg';
  const glassStyles = glass
    ? 'bg-white/60 backdrop-blur-md border border-white/20'
    : 'bg-white';
  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300'
    : '';

  return (
    <div className={cn(baseStyles, glassStyles, hoverStyles, className)}>
      {children}
    </div>
  );
};
