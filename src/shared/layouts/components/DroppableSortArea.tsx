import { SortableContext } from '@dnd-kit/sortable';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Droppable } from '@/shared/components';
import { ITEM_HEIGHT, ITEM_WIDTH } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import { useDroppedItemsStore } from '@/shared/stores';

import { VirtualSortableItm } from './VirtualSortableItm';

export function DroppableSortArea() {
  const { droppedItems } = useDroppedItemsStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        setContainerWidth(width - 100);
        setContainerHeight(height);

        const cols = Math.max(1, Math.floor(width / ITEM_WIDTH));
        setColumnCount(cols);
      }
    }

    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const rowCount = Math.ceil(droppedItems.length / columnCount);

  return (
    <section
      ref={containerRef}
      className="w-full flex-1 flex flex-col bg-blue-100 dark:bg-slate-700 shadow-md p-4 gap-y-6"
      style={{ minHeight: '300px' }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <h2 className="inline-flex gap-2 text-2xl font-bold mb-2">
            Drop Components Here <Info className="cursor-pointer" />
          </h2>
        </TooltipTrigger>
        <TooltipContent>
          <p>Drag the components from the sidebar and drop them in below</p>
        </TooltipContent>
      </Tooltip>

      <Droppable id={ELayoutBasedDndKitVariants?.MAIN_SORTABLE_ZONE}>
        <SortableContext
          id={ELayoutBasedDndKitVariants?.MAIN_SORTABLE_ZONE}
          items={droppedItems}
        >
          {containerWidth > 0 && containerHeight > 0 && (
            <Grid
              columnCount={columnCount}
              rowCount={rowCount}
              columnWidth={ITEM_WIDTH}
              rowHeight={ITEM_HEIGHT}
              width={containerWidth}
              height={containerHeight}
              itemData={{ columnCount }}
            >
              {VirtualSortableItm}
            </Grid>
          )}
        </SortableContext>
      </Droppable>
    </section>
  );
}
