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
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Droppable, PaletteCard, SortableItem } from '@/shared/components';
import {
  Dynamic_Components_List,
  Dynamic_Components_List_Dropzone_ID,
  Dynamic_Components_List_Sortable_Zone_ID,
} from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

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

        <section className="flex-1 flex flex-col  bg-blue-100 dark:bg-slate-700 shadow-md p-4 gap-y-6">
          <h1 className="text-2xl font-bold mb-4">Main</h1>
          <p className="text-base leading-relaxed mb-4">
            This layout also supports <strong>light</strong>,
            <strong>dark</strong>, and <strong>system</strong> themes. Try
            switching themes to see it in action.
          </p>
          <p className="text-base leading-relaxed mb-4">
            You can <strong>re-arrange</strong> the components as you like,
          </p>

          <Droppable id={Dynamic_Components_List_Dropzone_ID}>
            <SortableContext
              id={Dynamic_Components_List_Sortable_Zone_ID}
              items={droppedItems}
            >
              {droppedItems.map((droppedId) => {
                const paletteCardComponent = Dynamic_Components_List.find(
                  (paletteCardItm) =>
                    droppedId?.toString().includes(paletteCardItm.id)
                );

                return paletteCardComponent ? (
                  <SortableItem
                    key={droppedId}
                    id={droppedId}
                    metaData={{
                      type: ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE,
                    }}
                  >
                    <PaletteCard
                      key={droppedId}
                      title={paletteCardComponent.title}
                      description={paletteCardComponent.description}
                    />
                  </SortableItem>
                ) : null;
              })}
            </SortableContext>
          </Droppable>
        </section>
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
