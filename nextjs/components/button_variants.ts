import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'group inline-flex items-center gap-2 rounded-full px-7 py-3 text-xl font-medium shadow-md transition-all duration-300 hover:-translate-y-1 disabled:opacity-60',
  {
    variants: {
      variant: {
        white: 'text-secondary-foreground bg-secondary-background',
        blue: 'text-white bg-blue',
      },
    },
    defaultVariants: { variant: 'white' },
  }
);
