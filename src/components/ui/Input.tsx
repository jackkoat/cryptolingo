import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-small font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-14 md:h-12 px-4 rounded-md text-body bg-white border border-neutral-200',
            'placeholder:text-neutral-500 text-neutral-900',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            error && 'ring-2 ring-error-500',
            success && 'ring-2 ring-success-500',
            !error && !success && 'focus:ring-primary-500',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            'transition-all duration-normal',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-small text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
