import { memo } from 'react';
import {
  Area,
  CartesianGrid,
  AreaChart as ReChartsAreaChart,
  XAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_1,
  CHART_DATA_VARIANT_1,
} from '@/shared/constants';

import type { BaseChartDataPropsType } from './types-chart';

export const AreaChart = memo(function AreaChartComponent({
  data = CHART_DATA_VARIANT_1,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_1>) {
  return (
    <ChartContainer config={CHART_CONFIG_VARIANT_1}>
      <ReChartsAreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="mobile"
          type="natural"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </ReChartsAreaChart>
    </ChartContainer>
  );
});
