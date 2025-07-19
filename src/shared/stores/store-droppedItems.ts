import { create } from 'zustand';

import type { DroppedItemsType } from '../layouts/components/types-component';

type DroppedItemsState = {
  droppedItems: DroppedItemsType;
  setDroppedItems: (items: DroppedItemsType) => void;
  resetDroppedItems: () => void;
};

export const useDroppedItemsStore = create<DroppedItemsState>()((set) => ({
  droppedItems: [],

  setDroppedItems: (items) => set({ droppedItems: items }),

  resetDroppedItems: () => set({ droppedItems: [] }),
}));
