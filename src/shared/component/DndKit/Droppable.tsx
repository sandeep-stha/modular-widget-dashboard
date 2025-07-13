import { useDroppable } from '@dnd-kit/core';

import type { PropsWithChildren } from 'react';

export function Droppable({ children }: PropsWithChildren) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable">
      {children}
    </div>
  );
}
