import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

import { SortableDynamicComponentSwitcher } from './SortableDynamicComponentSwitcher';

import type { VirtualSortableItmPropsType } from './types-component';

export function VirtualSortableItm({
  columnIndex,
  rowIndex,
  style,
  data,
}: VirtualSortableItmPropsType) {
  const { droppedItems, columnCount } = data;

  const droppedItmIdx = rowIndex * columnCount + columnIndex;

  const droppedItmId = droppedItems[droppedItmIdx]?.id;

  const paletteCardComponent = DASHBOARD_CHART_COMPONENT_LIST.find(
    (componentItm) => droppedItmId?.toString()?.includes(componentItm.id)
  );

  if (
    !droppedItmId ||
    droppedItmIdx >= droppedItems.length ||
    !paletteCardComponent
  )
    return null;

  return (
    <div style={style}>
      <div className="p-4">
        <SortableDynamicComponentSwitcher
          key={droppedItmId}
          id={droppedItmId}
          metaData={{ type: ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE }}
        />
      </div>
    </div>
  );
}
