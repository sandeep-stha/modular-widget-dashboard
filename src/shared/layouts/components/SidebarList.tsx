import { Draggable } from '@/shared/components';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { ELayoutBasedDndKitVariants } from '@/shared/enums';
import { generateUIComponentByTypeUtil } from '@/shared/utils';

export function SidebarList() {
  return (
    <div className="flex-1 flex flex-col w-full overflow-y-auto gap-y-10">
      {DASHBOARD_CHART_COMPONENT_LIST.map((componentItm) => {
        const uniqueComponentDropId = `${componentItm?.id}-${Date.now()}`;
        return (
          <Draggable
            key={componentItm?.id}
            id={uniqueComponentDropId}
            metaData={{ type: ELayoutBasedDndKitVariants.SIDEBAR }}
          >
            {generateUIComponentByTypeUtil(componentItm)}
          </Draggable>
        );
      })}
    </div>
  );
}
