import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-400 disabled:opacity-60',
  outline:
    'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 focus-visible:ring-blue-400',
  ghost: 'text-slate-300 hover:bg-slate-800 focus-visible:ring-blue-400',
};

export function Button({ className, variant = 'default', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
