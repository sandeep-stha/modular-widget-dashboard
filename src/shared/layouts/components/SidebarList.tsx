import { Draggable } from '@/shared/components';
import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';
import { generateUIComponentByTypeUtil } from '@/shared/utils';

export function SidebarList() {
  return (
    <div className="flex-1 flex flex-col w-full overflow-y-auto gap-y-10 cursor-grab">
      {DASHBOARD_CHART_COMPONENT_LIST.map((componentItm) => (
        <Draggable key={componentItm?.id} id={componentItm?.id}>
          {generateUIComponentByTypeUtil(componentItm)}
        </Draggable>
      ))}
    </div>
  );
}
