import { useEffect, useRef } from 'react';

import { PaletteCard, SortableItem } from '@/shared/components';
import { Dynamic_Components_List } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

import type { VirtualSortableItmPropsType } from './types-component';

export function VirtualSortableItm({
  columnIndex,
  rowIndex,
  style,
  data,
}: VirtualSortableItmPropsType) {
  const { droppedItems, columnCount, setRowHeight, setColumnWidth } = data;

  const index = rowIndex * columnCount + columnIndex;

  const droppedId = droppedItems[index];

  const paletteCardComponent = Dynamic_Components_List.find((itm) =>
    droppedId?.toString().includes(itm.id)
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === element) {
          const { height, width } = entry.contentRect;
          setRowHeight(rowIndex, height);
          setColumnWidth(columnIndex, width);
        }
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [rowIndex, columnIndex, setRowHeight, setColumnWidth]);

  if (!paletteCardComponent || index >= droppedItems.length) return null;

  return (
    <div ref={ref} style={{ ...style }}>
      <div className="p-4">
        <SortableItem
          key={droppedId}
          id={droppedId}
          metaData={{ type: ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE }}
        >
          <PaletteCard
            title={paletteCardComponent.title}
            description={paletteCardComponent.description}
          />
        </SortableItem>
      </div>
    </div>
  );
}
