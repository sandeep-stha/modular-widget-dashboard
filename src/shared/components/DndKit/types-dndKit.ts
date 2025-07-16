import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ReactNode } from 'react';

type MandatoryDndKitPropsType = {
  id: UniqueIdentifier;
};

type BaseDndKitPropsType = {
  children: ReactNode;
  metaData?: Record<'type', string>;
} & MandatoryDndKitPropsType;

export type { BaseDndKitPropsType, MandatoryDndKitPropsType };
