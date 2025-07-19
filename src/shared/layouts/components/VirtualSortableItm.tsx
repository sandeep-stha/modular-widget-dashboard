import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { useDroppedItemsStore } from '@/shared/stores';
import { modifyInputDataUtil } from '@/shared/utils';

import { SortableDynamicComponentSwitcher } from './SortableDynamicComponentSwitcher';

import type { VirtualSortableItmPropsType } from './types-component';

export function VirtualSortableItm({
  columnIndex,
  rowIndex,
  style,
  data,
}: VirtualSortableItmPropsType) {
  const { droppedItems } = useDroppedItemsStore();

  const { columnCount } = data;

  const droppedItmIdx = rowIndex * columnCount + columnIndex;

  const droppedItmId = droppedItems[droppedItmIdx]?.id;

  const renderComponent = DASHBOARD_CHART_COMPONENT_LIST.find(
    (componentItm) => {
      const parsedDroppedItmId = modifyInputDataUtil(droppedItmId, {
        popAfterLastMatch: '_',
      });

      return parsedDroppedItmId === `${componentItm.id}`;
    }
  );

  if (!droppedItmId || droppedItmIdx >= droppedItems.length || !renderComponent)
    return null;

  return (
    <div style={style}>
      <div className="p-4 ">
        <SortableDynamicComponentSwitcher
          key={droppedItmId}
          id={droppedItmId}
        />
      </div>
    </div>
  );
}
