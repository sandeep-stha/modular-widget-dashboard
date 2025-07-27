import { Move } from 'lucide-react';
import { type JSX } from 'react';

import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';

import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadialBarChart,
  StackedBarChart,
} from '../components/Charts';
import { EDashboardChartComponentVariants } from '../enums';

import type { ChartPayloadType } from '../components/Charts/utils';

const componentsMap: Record<
  keyof typeof EDashboardChartComponentVariants,
  React.ComponentType<{ chartPayload?: ChartPayloadType }>
> = {
  [EDashboardChartComponentVariants.AREA_CHART]: AreaChart,
  [EDashboardChartComponentVariants.BAR_CHART]: BarChart,
  [EDashboardChartComponentVariants.LINE_CHART]: LineChart,
  [EDashboardChartComponentVariants.PIE_CHART]: PieChart,
  [EDashboardChartComponentVariants.RADIAL_BAR_CHART]: RadialBarChart,
  [EDashboardChartComponentVariants.STACKED_BAR_CHART]: StackedBarChart,
};

export function generateUIComponentByTypeUtil(
  metaData?: (typeof DASHBOARD_CHART_COMPONENT_LIST)[number],
  chartProps?: { data?: string }
): JSX.Element {
  const type = metaData?.type;

  const Component =
    type && type in componentsMap
      ? componentsMap[type as keyof typeof componentsMap]
      : null;

  return Component ? (
    <Component chartPayload={chartProps?.data as unknown as ChartPayloadType} />
  ) : (
    <Move />
  );
}
