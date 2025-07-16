import { type JSX } from 'react';

import { DASHBOARD_CHART_COMPONENT_LIST } from '@/shared/constants';

import { PaletteCard } from '../components';
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadialBarChart,
  StackedBarChart,
} from '../components/Charts';
import { EDashboardChartComponentVariants } from '../enums';

const componentsMap: Record<
  keyof typeof EDashboardChartComponentVariants,
  React.ComponentType
> = {
  [EDashboardChartComponentVariants.AREA_CHART]: AreaChart,
  [EDashboardChartComponentVariants.BAR_CHART]: BarChart,
  [EDashboardChartComponentVariants.LINE_CHART]: LineChart,
  [EDashboardChartComponentVariants.PIE_CHART]: PieChart,
  [EDashboardChartComponentVariants.RADIAL_BAR_CHART]: RadialBarChart,
  [EDashboardChartComponentVariants.STACKED_BAR_CHART]: StackedBarChart,
};

export function generateUIComponentByTypeUtil(
  componentMetaData?: (typeof DASHBOARD_CHART_COMPONENT_LIST)[number]
): JSX.Element {
  const type = componentMetaData?.type;
  const title = componentMetaData?.title ?? '';
  const description = componentMetaData?.description ?? '';

  const Component = type ? componentsMap[type] : null;

  return Component ? (
    <Component />
  ) : (
    <PaletteCard title={title} description={description} />
  );
}
