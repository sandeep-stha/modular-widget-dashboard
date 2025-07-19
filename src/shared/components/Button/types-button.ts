import type { buttonVariants } from '@/components/ui/button';

import type { VariantProps } from 'class-variance-authority';

type BaseButtonPropsType = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

type ButtonPropsType = {
  hidden?: boolean;
  label: string;
  handleFn?: VoidFunction;
  buttonProps?: BaseButtonPropsType;
};

export type { ButtonPropsType };
