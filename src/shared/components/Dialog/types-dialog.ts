import type { ButtonPropsType } from '../Button';
import type { ReactNode } from 'react';

type DialogButtonPropsType = {
  preventClose?: boolean;
} & ButtonPropsType;

type CoreDialogPropsType = {
  title: string;
  description: string;

  children: ReactNode;
};

type BaseDialogPropsType = {
  open: boolean;
  handleOpenChange: VoidFunction;
};

type BasicDialogPropsType = {
  primaryAction?: ButtonPropsType;
  secondaryAction?: DialogButtonPropsType;
};

type DialogPropsType = CoreDialogPropsType &
  BaseDialogPropsType &
  BasicDialogPropsType;

export type { BaseDialogPropsType, DialogPropsType };
