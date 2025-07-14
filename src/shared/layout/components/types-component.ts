import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';

type LayoutDndActiveElementType = {
  id: UniqueIdentifier;
  type: string;
};

type LayoutBodyPropsType = {
  currentActiveItm: LayoutDndActiveElementType | null;
  setCurrentActiveItm: Dispatch<
    SetStateAction<LayoutDndActiveElementType | null>
  >;

  droppedItems: UniqueIdentifier[];
  setDroppedItems: Dispatch<SetStateAction<UniqueIdentifier[]>>;
};

export type { LayoutBodyPropsType, LayoutDndActiveElementType };
