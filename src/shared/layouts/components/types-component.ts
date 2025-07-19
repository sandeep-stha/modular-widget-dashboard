import type { MandatoryDndKitPropsType } from '@/shared/components';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';
import type { GridChildComponentProps } from 'react-window';
import type { UUIDTypes } from 'uuid';

type DroppedItemsType = Array<{
  id: UniqueIdentifier;
  uuid: UUIDTypes;
  data: string | null;
}>;

type VirtualSortableItmPropsType = GridChildComponentProps<{
  columnCount: number;
}>;

type LayoutDndActiveElementType = {
  id: UniqueIdentifier;
  type: string;
};

type LayoutBodyPropsType = {
  currentActiveItm: LayoutDndActiveElementType | null;
  setCurrentActiveItm: Dispatch<
    SetStateAction<LayoutDndActiveElementType | null>
  >;

  setDroppedItems: Dispatch<SetStateAction<UniqueIdentifier[]>>;
};

type TrashBinDroppablePropsType = {
  enabled?: boolean;
} & MandatoryDndKitPropsType;

export type {
  DroppedItemsType,
  LayoutBodyPropsType,
  LayoutDndActiveElementType,
  TrashBinDroppablePropsType,
  VirtualSortableItmPropsType,
};
