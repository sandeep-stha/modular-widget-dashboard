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
      className={`w-full p-4 rounded-md border-2 transition-colors  ${
        isOver
          ? 'border-red-400 bg-red-500 dark:bg-red-700 text-red-100'
          : 'border-red-500 dark:border-red-900 bg-red-200 text-red-700'
      } ${enabled ? 'opacity-100' : 'opacity-50'}`}
    >
      🗑 &nbsp; Drop here to delete
    </div>
  );
}
