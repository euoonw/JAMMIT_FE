import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import React from 'react';

const buttonVariants = cva(
  'h-[2.75rem] rounded-[0.75rem] flex items-center justify-center text-[1rem] font-semibold cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        solid:
          'bg-[#9900ff] text-white hover:bg-[#7a00cc] active:bg-[#6600a9] disabled:bg-gray-400',
        outline:
          'bg-transparate border border-solid text-[#9900ff] border-[#9900ff] hover:border-[#7a00cc] hover:text-[#7a00cc] active:border-[#6600a9] active:text-[#6600a9] disabled:border-gray-400 disabled:text-gray-400',
        outlineOrder:
          'bg-transparate border border-solid text-[var(--purple-500)] border-[var(--purple-500)] hover:border-[var(--purple-500)] hover:text-[var(--purple-500)]',
      },
      size: {
        large: 'w-[20.7rem]',
        small: 'w-[7.5rem]',
        middle: 'w-[6.25rem]',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'large',
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'outlineOrder';
  size?: 'large' | 'small' | 'middle';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  size = 'large',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
