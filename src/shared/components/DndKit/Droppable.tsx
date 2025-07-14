import { useDroppable } from '@dnd-kit/core';

import type { BaseDndKitPropsType } from './types-dndKit';

export function Droppable({ id, children }: BaseDndKitPropsType) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 flex flex-col w-full overflow-y-auto gap-y-10 border-dotted border-2 border-blue-300 dark:border-slate-600 p-4"
    >
      {children}
    </div>
  );
}
