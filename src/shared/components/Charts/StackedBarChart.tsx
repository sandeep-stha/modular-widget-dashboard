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
  const dataKeys = Object.keys(data?.[0]) ?? [];

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
        {dataKeys?.slice(1)?.map((dataItm, dataIdx) => {
          const evenDataIdx = dataIdx % 2 === 0;
          return (
            <Bar
              key={dataItm}
              dataKey={dataItm}
              stackId="a"
              fill={
                evenDataIdx ? 'var(--color-running)' : 'var(--color-swimming)'
              }
              radius={evenDataIdx ? [0, 0, 4, 4] : [4, 4, 0, 0]}
            />
          );
        })}
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
