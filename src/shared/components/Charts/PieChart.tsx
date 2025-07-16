import { memo } from 'react';
import { Pie, PieChart as ReChartsPieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_2,
  CHART_DATA_VARIANT_2,
} from '@/shared/constants';

import type { BaseChartDataPropsType } from './types-chart';

export const PieChart = memo(function PieChartComponent({
  data = CHART_DATA_VARIANT_2,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_2>) {
  const initialDataKey = (Object.keys(data?.[0]) ?? [])?.[0];
  const initialChartConfigKey = (Object.keys(CHART_CONFIG_VARIANT_2) ??
    [])?.[0];

  return (
    <ChartContainer
      config={CHART_CONFIG_VARIANT_2}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
    >
      <ReChartsPieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey={initialChartConfigKey}
          label
          nameKey={initialDataKey}
        />
      </ReChartsPieChart>
    </ChartContainer>
  );
});
