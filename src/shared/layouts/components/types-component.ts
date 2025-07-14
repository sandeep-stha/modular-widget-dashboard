import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';
import type { GridChildComponentProps } from 'react-window';

type droppedItemsType = UniqueIdentifier[];

type DroppableSortAreaPropsType = {
  droppedItems: droppedItemsType;
};

type VirtualSortableItmPropsType = GridChildComponentProps<{
  droppedItems: UniqueIdentifier[];
  columnCount: number;
  setRowHeight: (row: number, size: number) => void;
  setColumnWidth: (col: number, size: number) => void;
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
  DroppableSortAreaPropsType,
  LayoutBodyPropsType,
  LayoutDndActiveElementType,
  VirtualSortableItmPropsType,
};
