import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';
import type { GridChildComponentProps } from 'react-window';

type DroppedItemsType = Array<{
  id: UniqueIdentifier;
  data?: string;
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

export type {
  DroppedItemsType,
  LayoutBodyPropsType,
  LayoutDndActiveElementType,
  VirtualSortableItmPropsType,
};
