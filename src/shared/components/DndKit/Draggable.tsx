import { useDraggable } from '@dnd-kit/core';

import type { BaseDndKitPropsType } from './types-dndKit';

export function Draggable({ id, metaData, children }: BaseDndKitPropsType) {
  const { active, attributes, listeners, setNodeRef } = useDraggable({
    id,
    ...(metaData ? { data: metaData } : {}),
  });

  const isThisDragging = active?.id === id;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={isThisDragging ? 'opacity-50' : 'opacity-100'}
    >
      {children}
    </button>
  );
}
