import type { BaseDialogPropsType } from '@/shared/components';

import type { DroppedItemsType } from '../types-component';

type CustomDialogPropsType = BaseDialogPropsType & {
  selectedItmId?: string;
  selectedItmType?: string;
  droppedItmList?: DroppedItemsType;
};

export type { CustomDialogPropsType };
