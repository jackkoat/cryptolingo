import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  glass?: boolean;
}

export function Card({ children, className, hover = false, onClick, glass = false }: CardProps) {
  const baseStyles = glass 
    ? 'bg-white/60 backdrop-blur-xl rounded-2xl shadow-glow-soft border border-white/30 p-8 md:p-6 transition-all duration-normal'
    : 'bg-white rounded-2xl shadow-card p-8 md:p-6 transition-all duration-normal';
  const hoverStyles = hover ? 'cursor-pointer hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card-hover' : '';

  return (
    <div className={cn(baseStyles, hoverStyles, className)} onClick={onClick}>
      {children}
    </div>
  );
}
