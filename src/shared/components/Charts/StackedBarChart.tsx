import { memo } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

import { generateChartConfigAndDataVariant1Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';

export const StackedBarChart = memo(function StackedBarChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant1Util(chartPayload);

  const dataKeys = Object.keys(data?.[0]) ?? [];

  const chartConfigKeys =
    (Object.keys(config) as Array<keyof typeof config>) ?? [];

  return (
    <ChartContainer config={config}>
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
                evenDataIdx
                  ? (config?.[chartConfigKeys?.[dataIdx]]?.color ??
                    generateRandomHexColorCodeUtil())
                  : (config?.[chartConfigKeys?.[dataIdx]]?.color ??
                    generateRandomHexColorCodeUtil())
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
