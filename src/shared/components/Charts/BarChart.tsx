import { memo } from 'react';
import { Bar, BarChart as ReChartsBarChart } from 'recharts';

import { ChartContainer } from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_1,
  CHART_DATA_VARIANT_1,
} from '@/shared/constants';

import type { BaseChartDataPropsType } from './types-chart';

export const BarChart = memo(function BarChartComponent({
  data = CHART_DATA_VARIANT_1,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_1>) {
  return (
    <ChartContainer
      config={CHART_CONFIG_VARIANT_1}
      className="min-h-[200px] w-full"
    >
      <ReChartsBarChart accessibilityLayer data={data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </ReChartsBarChart>
    </ChartContainer>
  );
});
