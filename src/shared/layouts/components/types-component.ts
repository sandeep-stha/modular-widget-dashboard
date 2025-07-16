import type { MandatoryDndKitPropsType } from '@/shared/components';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';
import type { GridChildComponentProps } from 'react-window';

type DroppedItemsType = Array<{ id: UniqueIdentifier; metaData?: unknown }>;

type DroppableSortAreaPropsType = {
  droppedItems: DroppedItemsType;
};

type VirtualSortableItmPropsType = GridChildComponentProps<{
  droppedItems: DroppedItemsType;
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
  DroppableSortAreaPropsType,
  DroppedItemsType,
  LayoutBodyPropsType,
  LayoutDndActiveElementType,
  TrashBinDroppablePropsType,
  VirtualSortableItmPropsType,
};
