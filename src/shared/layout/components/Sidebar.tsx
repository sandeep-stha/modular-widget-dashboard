import { Draggable, PaletteCard, TrashbinDroppable } from '@/shared/components';
import { Dynamic_Components_List } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';

import type { LayoutBodyPropsType } from './types-component';

export function Sidebar({
  currentActiveItm,
}: Pick<LayoutBodyPropsType, 'currentActiveItm'>) {
  const isTrashbinDroppableEnabled =
    currentActiveItm?.type !== ELayoutBasedDndKitVariants.SIDEBAR;

  return (
    <aside className="relative w-[clamp(250px,_20%,_400px)] shadow-md flex flex-col gap-y-6 bg-blue-200 dark:bg-slate-800 p-4 text-black dark:text-white">
      <h2 className="text-lg font-semibold mb-2">Components</h2>

      <div className="flex-1 flex flex-col w-full overflow-y-auto gap-y-10">
        {Dynamic_Components_List.map((componentItm) => {
          const uniqueDraggableId = `${componentItm.id}-${Date.now()}`;

          return (
            <Draggable
              key={uniqueDraggableId}
              id={uniqueDraggableId}
              metaData={{ type: ELayoutBasedDndKitVariants.SIDEBAR }}
            >
              <PaletteCard
                title={componentItm.title}
                description={componentItm.description}
              />
            </Draggable>
          );
        })}
      </div>

      <section
        className={`z-[1000] ${isTrashbinDroppableEnabled ? 'z-[1000]' : 'z-auto'}`}
      >
        <TrashbinDroppable
          id={ELayoutBasedDndKitVariants.TRASH_BIN}
          enabled={isTrashbinDroppableEnabled}
        />
      </section>
    </aside>
  );
}
