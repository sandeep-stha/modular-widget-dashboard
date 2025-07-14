import type { UniqueIdentifier } from '@dnd-kit/core';
import type { ReactNode } from 'react';

type MandatoryDndKitPropsType = {
  id: UniqueIdentifier;
};

type BaseDndKitPropsType = {
  children: ReactNode;
  metaData?: Record<'type', string>;
} & MandatoryDndKitPropsType;

type TrashBinDroppablePropsType = {
  enabled?: boolean;
} & MandatoryDndKitPropsType;

export type {
  BaseDndKitPropsType,
  MandatoryDndKitPropsType,
  TrashBinDroppablePropsType,
};
