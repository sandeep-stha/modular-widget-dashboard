import { SortableContext } from '@dnd-kit/sortable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { Droppable } from '@/shared/components';
import {
  Dynamic_Components_List_Dropzone_ID,
  Dynamic_Components_List_Sortable_Zone_ID,
} from '@/shared/constants';

import { VirtualSortableItm } from './VirtualSortableItm';

import type { DroppableSortAreaPropsType } from './types-component';

export function DroppableSortArea({
  droppedItems,
}: DroppableSortAreaPropsType) {
  const minColumnWidth = 320;
  const defaultRowHeight = 160;

  const [columnCount, setColumnCount] = useState(1);

  const rowCount = Math.ceil(droppedItems.length / columnCount);

  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  const [columnWidths, setColumnWidths] = useState<number[]>(() =>
    Array.from({ length: columnCount }, () => minColumnWidth)
  );

  const [rowHeights, setRowHeights] = useState<number[]>(() =>
    Array.from({ length: rowCount }, () => defaultRowHeight)
  );

  const gridRef = useRef<Grid>(null);

  const gridWidth = columnWidths.reduce((a, b) => a + b, 0);

  const gridHeight = 600;

  useEffect(() => {
    if (!containerWidth) return;

    const newColumnCount = Math.max(
      1,
      Math.floor(containerWidth / minColumnWidth)
    );
    setColumnCount(newColumnCount);
  }, [containerWidth]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    setRowHeights((heights) => {
      if (heights.length === rowCount) return heights;
      const newHeights = [...heights];
      if (newHeights.length < rowCount) newHeights.push(defaultRowHeight);
      if (newHeights.length > rowCount) newHeights.pop();
      return newHeights;
    });
  }, [rowCount]);

  useEffect(() => {
    setColumnWidths((widths) => {
      if (widths.length === columnCount) return widths;
      const newWidths = [...widths];
      while (newWidths.length < columnCount) newWidths.push(minColumnWidth);
      while (newWidths.length > columnCount) newWidths.pop();
      return newWidths;
    });
  }, [columnCount]);

  const setRowHeight = useCallback((rowIndex: number, size: number) => {
    setRowHeights((heights) => {
      if (heights[rowIndex] === size) return heights;
      const newHeights = [...heights];
      newHeights[rowIndex] = size;
      return newHeights;
    });
    gridRef.current?.resetAfterRowIndex(rowIndex);
  }, []);

  const setColumnWidth = useCallback((colIndex: number, size: number) => {
    setColumnWidths((widths) => {
      if (widths[colIndex] === size) return widths;
      const newWidths = [...widths];
      newWidths[colIndex] = size;
      return newWidths;
    });
    gridRef.current?.resetAfterColumnIndex(colIndex);
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex-1 flex flex-col bg-blue-100 dark:bg-slate-700 shadow-md p-4 gap-y-6"
    >
      <h1 className="text-2xl font-bold mb-4">Draggable/Sortable Area</h1>
      <p className="text-base leading-relaxed mb-4">
        This layout also supports <strong>light</strong>, <strong>dark</strong>,
        and <strong>system</strong> themes.
      </p>
      <p className="text-base leading-relaxed mb-4">
        Try <strong>dropping</strong> the components below from the component{' '}
        <strong>sidebar</strong>. You can <strong>re-arrange</strong> them as
        you like.
      </p>

      <Droppable id={Dynamic_Components_List_Dropzone_ID}>
        <SortableContext
          id={Dynamic_Components_List_Sortable_Zone_ID}
          items={droppedItems}
        >
          <Grid
            ref={gridRef}
            columnCount={columnCount}
            rowCount={rowCount}
            columnWidth={(index) => columnWidths[index] || minColumnWidth}
            rowHeight={(index) => rowHeights[index] || defaultRowHeight}
            width={gridWidth}
            height={gridHeight}
            itemData={{
              droppedItems,
              columnCount,
              setRowHeight,
              setColumnWidth,
            }}
          >
            {VirtualSortableItm}
          </Grid>
        </SortableContext>
      </Droppable>
    </section>
  );
}
