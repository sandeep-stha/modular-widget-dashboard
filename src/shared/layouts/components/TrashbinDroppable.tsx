import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { TrashBinDroppablePropsType } from './types-component';

export function TrashbinDroppable({
  id,
  enabled = true,
}: TrashBinDroppablePropsType) {
  const { setNodeRef, isOver, active } = useDroppable({ id });

  return (
    <section className={`z-[1000] ${enabled ? 'z-[1000]' : 'z-auto'}`}>
      <div
        ref={enabled ? setNodeRef : null}
        className={`mx-auto w-fit p-2 px-6 rounded-md border-2 transition-colors ${active?.id ? 'cursor-grab' : 'cursor-no-drop'} ${
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
          <TooltipContent>
            <p>
              Drag the components from the main area into here to delete them
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
}
