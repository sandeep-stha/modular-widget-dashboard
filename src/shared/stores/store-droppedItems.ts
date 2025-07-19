import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { cookieUtil, removeFalsyPropertiesUtil } from '../utils';

import type { DroppedItemsType } from '../layouts/components/types-component';

type DroppedItemsState = {
  droppedItems: DroppedItemsType;
  setDroppedItems: (items: DroppedItemsType) => void;
  resetDroppedItems: () => void;
};

export const useDroppedItemsStore = create<DroppedItemsState>()(
  persist(
    (set) => ({
      droppedItems: [],

      setDroppedItems: (items) => set({ droppedItems: items }),

      resetDroppedItems: () =>
        set(removeFalsyPropertiesUtil({ droppedItems: [] })),
    }),
    {
      name: 'dropped-items-storage',
      storage: createJSONStorage(() => cookieUtil),
    }
  )
);
