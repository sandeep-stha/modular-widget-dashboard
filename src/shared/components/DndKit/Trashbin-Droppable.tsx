import { useDroppable } from '@dnd-kit/core';

import type { TrashBinDroppablePropsType } from './types-dndKit';

export function TrashbinDroppable({
  id,
  enabled = true,
}: TrashBinDroppablePropsType) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={enabled ? setNodeRef : null}
      className={`w-full bg-red-100 dark:bg-red-950 p-4 rounded-md border-2 transition-colors text-red-700 dark:text-red-300 ${
        isOver ? 'border-red-500 bg-red-200' : 'border-gray-300'
      } ${enabled ? 'opacity-100' : 'opacity-50'}`}
    >
      🗑 Drop here to delete
    </div>
  );
}
