import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import { useDroppedItemsStore } from '@/shared/stores';
import {
  generateUIComponentByTypeUtil,
  modifyInputDataUtil,
} from '@/shared/utils';

import { DroppableSortArea } from '../DroppableSortArea';
import { SidebarList } from '../SidebarList';
import { TrashbinDroppable } from '../TrashbinDroppable';

import type { LayoutDndActiveElementType } from '../types-component';

export function MainUI() {
  const [currentActiveItm, setCurrentActiveItm] =
    useState<LayoutDndActiveElementType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const parsedCurrentActiveItmID = modifyInputDataUtil(currentActiveItm?.id, {
    popAfterLastMatch: '_',
  });

  const activeComponent = DASHBOARD_CHART_COMPONENT_LIST.find(
    (componentItm) => {
      return `${parsedCurrentActiveItmID}` === `${componentItm.id}`;
    }
  );

  const isTrashbinDroppableEnabled =
    currentActiveItm?.type !== ELayoutBasedDndKitVariants.SIDEBAR;

  const { droppedItems, setDroppedItems } = useDroppedItemsStore();

  return (
    <DndContext
      collisionDetection={pointerWithin}
      sensors={sensors}
      modifiers={[snapCenterToCursor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <main className="flex-1 overflow-auto flex">
        <aside className="relative w-[clamp(250px,_20%,_400px)] shadow-md flex flex-col gap-y-6 bg-blue-200 dark:bg-slate-800 p-4 text-black dark:text-white">
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="inline-flex gap-2 text-xl font-bold mb-2">
                Pick Components <Info className="cursor-pointer" />
              </h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Drag the components below and put them in main section in the
                right
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Sidebar Draggable Items List */}

          <SidebarList />

          {/* Sidebar Droppable Trash Bin Area */}
          <TrashbinDroppable
            id={ELayoutBasedDndKitVariants.TRASH_BIN}
            enabled={isTrashbinDroppableEnabled}
          />
        </aside>

        {/* Component Droppable and Sortable Area */}
        <DroppableSortArea />
      </main>

      {createPortal(
        <DragOverlay className="select-none pointer-events-none cursor-grabbing">
          {generateUIComponentByTypeUtil(activeComponent)}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    const activeEvent = event.active;

    setCurrentActiveItm(() => ({
      id: activeEvent.id,
      type: `${(activeEvent.data.current as LayoutDndActiveElementType)?.type ?? ''}`,
    }));
  }

  function handleDragCancel() {
    setCurrentActiveItm(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setCurrentActiveItm(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const oldIndex = droppedItems.findIndex((itm) => itm?.id === activeId);
    const newIndex = droppedItems.findIndex((itm) => itm?.id === overId);

    const isAddition = overId === ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE;

    const isDeletion = over?.id === ELayoutBasedDndKitVariants.TRASH_BIN;

    // Deletion
    if (isDeletion) {
      const newDroppedItemAfterDeletion = droppedItems.filter(
        (itm) => itm.id !== activeId
      );

      setDroppedItems(newDroppedItemAfterDeletion);
    } else if (isAddition) {
      // Addition
      const newDroppedItems = [
        ...droppedItems,
        {
          id: [activeId, uuidv4()].join('_'),
          uuid: uuidv4(),
          data: null,
        },
      ];
      setDroppedItems(newDroppedItems);
    } else {
      //Sorting
      const item = droppedItems[oldIndex];
      const withoutItem = droppedItems.filter((_, idx) => idx !== oldIndex);

      const reOrderedItems = [
        ...withoutItem.slice(0, newIndex),
        item,
        ...withoutItem.slice(newIndex),
      ];
      setDroppedItems(reOrderedItems);
    }

    setCurrentActiveItm(null);
  }
}
