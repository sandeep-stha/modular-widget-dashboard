import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pen } from 'lucide-react';
import { useState } from 'react';

import { type BaseDndKitPropsType } from '@/shared/components';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { useDroppedItemsStore } from '@/shared/stores';
import {
  generateUIComponentByTypeUtil,
  modifyInputDataUtil,
} from '@/shared/utils';

import { AddOrEditChartDataDialog } from './Main';

export function SortableDynamicComponentSwitcher({
  id,
  metaData,
}: Omit<BaseDndKitPropsType, 'children'>) {
  const { droppedItems } = useDroppedItemsStore();
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id, ...(metaData ? { data: metaData } : {}) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSorting = id === active?.id;

  const parsedIdentifierID = modifyInputDataUtil(id, {
    popAfterLastMatch: '_',
  });

  const componentMetaData = parsedIdentifierID
    ? DASHBOARD_CHART_COMPONENT_LIST?.find(
        (componentItm) => parsedIdentifierID === `${componentItm.id}`
      )
    : null;

  const currentDroppedItemsData = droppedItems?.find((itm) => itm?.id === id);
  const sanitizedCurrentDroppedItemsData = currentDroppedItemsData?.data
    ? JSON.parse(currentDroppedItemsData?.data)
    : '';

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <AddOrEditChartDataDialog
          open={isOpen}
          handleOpenChange={handleDialogClose}
          selectedItm={{
            id: id?.toString(),
            ...(componentMetaData
              ? {
                  metaData: componentMetaData,
                }
              : {}),
          }}
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
            generateUIComponentByTypeUtil(componentMetaData, {
              data: sanitizedCurrentDroppedItemsData,
            })}
        </div>
      </div>
    </>
  );

  function handleDialogClose() {
    setIsOpen(false);
  }

  function handleEditClick() {
    setIsOpen(true);
  }
}
