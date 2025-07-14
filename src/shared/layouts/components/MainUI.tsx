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
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { PaletteCard } from '@/shared/components';
import { Dynamic_Components_List } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

import { DroppableSortArea } from './DroppableSortArea';
import { Sidebar } from './Sidebar';

import type { LayoutDndActiveElementType } from './types-component';

export function MainUI() {
  const [currentActiveItm, setCurrentActiveItm] =
    useState<LayoutDndActiveElementType | null>(null);

  const [droppedItems, setDroppedItems] = useState<UniqueIdentifier[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeComponent = Dynamic_Components_List.find((componentItm) =>
    currentActiveItm?.id?.toString().includes(componentItm.id)
  );

  return (
    <DndContext
      collisionDetection={pointerWithin}
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <main className="flex-1 overflow-auto flex">
        {/* Sidebar */}
        <Sidebar currentActiveItm={currentActiveItm} />

        {/* Component Droppable and Sortable Area */}
        <DroppableSortArea droppedItems={droppedItems} />
      </main>

      {createPortal(
        <DragOverlay>
          {activeComponent ? (
            <PaletteCard
              title={activeComponent.title}
              description={activeComponent.description}
            />
          ) : null}
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

    const isActiveInList = droppedItems.includes(activeId);
    const isOverInList = droppedItems.includes(overId);

    const oldIndex = droppedItems.indexOf(activeId);
    const newIndex = droppedItems.indexOf(overId);

    const isSorting = isActiveInList && isOverInList && activeId !== overId;

    if (over?.id === ELayoutBasedDndKitVariants.TRASH_BIN) {
      const newDroppedItemAfterDeletion = droppedItems?.filter(
        (droppedItm) => droppedItm !== activeId
      );
      setDroppedItems(newDroppedItemAfterDeletion);
    }

    if (isSorting) {
      const reordered = [...droppedItems];
      reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, activeId);

      setDroppedItems(reordered);
    } else if (!isActiveInList) {
      setDroppedItems((prev) => [...prev, activeId]);
    }

    setCurrentActiveItm(null);
  }
}
