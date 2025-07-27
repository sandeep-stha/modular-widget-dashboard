import { memo } from 'react';
import {
  Bar,
  CartesianGrid,
  BarChart as ReChartsBarChart,
  XAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

import { generateChartConfigAndDataVariant1Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';

export const BarChart = memo(function BarChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant1Util(chartPayload);

  const configKeys = Object.keys(config) ?? [];

  const dataKeys = Object.keys(data?.[0]) ?? [];

  return (
    <ChartContainer className="min-h-[200px] w-full" config={config}>
      <ReChartsBarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeys?.[0]}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {dataKeys?.slice(1)?.map((dataItm, dataIdx) => {
          const chartDataColor =
            (config as Record<string, { label: string; color: string }>)[
              configKeys[dataIdx]
            ]?.color ?? generateRandomHexColorCodeUtil();

          return (
            <Bar
              key={dataItm}
              dataKey={dataItm}
              fill={chartDataColor}
              radius={4}
            />
          );
        })}
      </ReChartsBarChart>
    </ChartContainer>
  );
});
