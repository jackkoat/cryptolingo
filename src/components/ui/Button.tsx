import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'default' | 'large' | 'sm';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98] active:translate-y-0',
    secondary: 'bg-transparent border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.98]',
    success: 'bg-success-500 text-white hover:bg-success-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-success-500/25 active:scale-[0.98] active:translate-y-0',
  };

  const sizeStyles = {
    sm: 'h-10 px-4 text-sm',
    default: 'h-14 px-6 text-body md:h-12',
    large: 'h-14 px-8 text-body',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
