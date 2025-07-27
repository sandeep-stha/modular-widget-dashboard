import type { BaseDialogPropsType } from '@/shared/components';
import type { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';

type CustomDialogPropsType = BaseDialogPropsType & {
  selectedItm: {
    id?: string;
    metaData?: (typeof DASHBOARD_CHART_COMPONENT_LIST)[number];
  };
};

type ChartDataFormPropsType = {
  parentIndex: number;
};

export type { ChartDataFormPropsType, CustomDialogPropsType };
