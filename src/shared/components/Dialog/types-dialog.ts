import type { ButtonPropsType } from '../Button';
import type { ReactNode } from 'react';

type CoreDialogPropsType = {
  title: string;
  description: string;

  children: ReactNode;
};

type BaseDialogPropsType = {
  open: boolean;
  handleOpenChange: VoidFunction;

  primaryAction?: ButtonPropsType;
  secondaryAction?: ButtonPropsType;
};

type DialogPropsType = CoreDialogPropsType & BaseDialogPropsType;

export type { BaseDialogPropsType, DialogPropsType };
