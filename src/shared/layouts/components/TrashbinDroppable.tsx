import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { MandatoryDndKitPropsType } from '@/shared/components';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

export function TrashbinDroppable({ id }: MandatoryDndKitPropsType) {
  const { setNodeRef, isOver, active } = useDroppable({ id });

  const enabled =
    active?.data?.current?.sortable?.containerId ===
    ELayoutBasedDndKitVariants.MAIN_SORTABLE_ZONE;

  return (
    <section>
      <div
        ref={enabled ? setNodeRef : null}
        className={`mx-auto w-fit p-2 px-6 rounded-md border-2 transition-colors ${enabled ? 'cursor-grab' : 'cursor-no-drop'} ${
          isOver
            ? 'border-red-100 bg-red-500 dark:bg-red-700 text-red-100'
            : 'border-red-400 dark:border-white bg-red-200 dark:bg-red-600 text-red-700 dark:text-white'
        } ${enabled ? 'opacity-100' : 'opacity-50'}`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <h4 className="inline-flex gap-2 font-medium">
              <Trash2 /> Delete Components
            </h4>
          </TooltipTrigger>
          {enabled && (
            <TooltipContent>
              <p>
                Drag the components from the main area into here to delete them
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </section>
  );
}
