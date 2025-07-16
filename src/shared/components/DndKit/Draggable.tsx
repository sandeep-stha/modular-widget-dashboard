import { useDraggable } from '@dnd-kit/core';

import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import type { LayoutDndActiveElementType } from '@/shared/layouts/components/types-component';

import type { BaseDndKitPropsType } from './types-dndKit';

export function Draggable({ id, metaData, children }: BaseDndKitPropsType) {
  const { active, attributes, listeners, setNodeRef } = useDraggable({
    id,
    ...(metaData ? { data: metaData } : {}),
  });

  const idSplitArr = id ? id.toString().split('-').slice(0, -1) : [];

  const parsedId = idSplitArr?.length ? idSplitArr?.join('-') : null;

  const activeIdIncludesParsedId = active?.id
    ?.toString()
    ?.includes(`${parsedId}`);

  const activeMetaType = (active?.data?.current as LayoutDndActiveElementType)
    ?.type;

  const isThisDragging =
    activeIdIncludesParsedId &&
    activeMetaType !== ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`touch-none ${isThisDragging ? 'opacity-50 !cursor-grabbing' : 'opacity-100 cursor-grab'}`}
    >
      {children}
    </button>
  );
}
