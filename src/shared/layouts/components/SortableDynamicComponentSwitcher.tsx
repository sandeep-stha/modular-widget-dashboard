import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pen } from 'lucide-react';
import { useState } from 'react';

import { type BaseDndKitPropsType } from '@/shared/components';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import {
  generateUIComponentByTypeUtil,
  modifyInputDataUtil,
} from '@/shared/utils';

import { AddOrEditChartDataDialog } from './Main';

export function SortableDynamicComponentSwitcher({
  id,
  metaData,
}: Omit<BaseDndKitPropsType, 'children'>) {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id, ...(metaData ? { data: metaData } : {}) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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

  const [isOpen, setIsOpen] = useState(false);

  const [selectedItmType, setSelectedItmType] = useState<string>();

  return (
    <>
      {isOpen && (
        <AddOrEditChartDataDialog
          open={isOpen}
          handleOpenChange={handleDialogClose}
          selectedItmId={id?.toString()}
          selectedItmType={selectedItmType}
        />
      )}
      <div
        ref={setNodeRef}
        style={style}
        className={isSorting ? 'opacity-50' : 'opacity-100'}
      >
        <div className="relative pr-8">
          <div className="w-full flex justify-end items-end gap-4">
            <Pen
              className="w-6 mb-1 cursor-pointer"
              onClick={handleEditClick}
            />
            <div {...attributes} {...listeners} className="select-none">
              <GripVertical
                className={`w-8 text-slate-500 dark:text-white ${isSorting ? 'cursor-grabbing' : 'cursor-grab'}`}
              />
            </div>
          </div>
          {componentMetaData &&
            generateUIComponentByTypeUtil(componentMetaData)}
        </div>
      </div>
    </>
  );

  function handleDialogClose() {
    setIsOpen(false);
  }

  function handleEditClick() {
    const currentEditItmType = DASHBOARD_CHART_COMPONENT_LIST?.find((itm) =>
      id?.toString()?.includes(itm?.id)
    )?.type;

    setSelectedItmType(currentEditItmType);

    setIsOpen(true);
  }
}
