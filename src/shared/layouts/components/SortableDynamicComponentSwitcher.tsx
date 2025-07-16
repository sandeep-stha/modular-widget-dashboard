import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { type BaseDndKitPropsType } from '@/shared/components';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import {
  generateUIComponentByTypeUtil,
  modifyInputDataUtil,
} from '@/shared/utils';

export function SortableDynamicComponentSwitcher({
  id,
  metaData,
}: Omit<BaseDndKitPropsType, 'children'>) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id, ...(metaData ? { data: metaData } : {}) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // cursor: 'grab',
  };

  const isSorting = id === active?.id;

  const parsedIdentifierID = modifyInputDataUtil(id, {
    replace: [ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE],
    removeAfterLastMatch: '-',
  });

  const componentMetaData = parsedIdentifierID
    ? DASHBOARD_CHART_COMPONENT_LIST.find(
        (componentItm) => componentItm.id === parsedIdentifierID
      )
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isSorting ? 'opacity-50 !cursor-grabbing' : 'opacity-100 cursor-grab'
      }
    >
      <div className="relative pr-8">
        {componentMetaData && generateUIComponentByTypeUtil(componentMetaData)}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-0 right-0 select-none"
        >
          <GripVertical className="w-8 text-slate-500 dark:text-white" />
        </div>
      </div>
    </div>
  );
}
