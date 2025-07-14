import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { BaseDndKitPropsType } from './types-dndKit';

export function SortableItem({ id, metaData, children }: BaseDndKitPropsType) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id, ...(metaData ? { data: metaData } : {}) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  const isSorting = id === active?.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isSorting ? 'opacity-50' : 'opacity-100'}
    >
      {children}
    </div>
  );
}
