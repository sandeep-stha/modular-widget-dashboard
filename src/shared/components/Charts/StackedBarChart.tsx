import { memo } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_4,
  CHART_DATA_VARIANT_4,
} from '@/shared/constants';

import type { BaseChartDataPropsType } from './types-chart';

export const StackedBarChart = memo(function StackedBarChartComponent({
  data = CHART_DATA_VARIANT_4,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_4>) {
  return (
    <ChartContainer config={CHART_CONFIG_VARIANT_4}>
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            return new Date(value).toLocaleDateString('en-US', {
              weekday: 'short',
            });
          }}
        />
        <Bar
          dataKey="running"
          stackId="a"
          fill="var(--color-running)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="swimming"
          stackId="a"
          fill="var(--color-swimming)"
          radius={[4, 4, 0, 0]}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
              }}
            />
          }
          cursor={false}
          defaultIndex={1}
        />
      </BarChart>
    </ChartContainer>
  );
});
