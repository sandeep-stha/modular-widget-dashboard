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
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

import { generateChartConfigAndDataVariant1Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';

export const AreaChart = memo(function AreaChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant1Util(chartPayload);

  const configKeys = Object.keys(config) ?? [];

  const dataKeys = Object.keys(data?.[0]) ?? [];

  return (
    <ChartContainer className="min-h-[200px] w-full" config={config}>
      <ReChartsAreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey={dataKeys?.[0]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        {dataKeys?.slice(1)?.map((dataItm, dataIdx) => {
          const chartDataColor =
            (config as Record<string, { label: string; color: string }>)[
              configKeys[dataIdx]
            ]?.color ?? generateRandomHexColorCodeUtil();

          return (
            <Area
              key={dataItm}
              dataKey={dataItm}
              type="natural"
              fill={chartDataColor}
              fillOpacity={0.4}
              stroke={chartDataColor}
              stackId={dataItm}
            />
          );
        })}
      </ReChartsAreaChart>
    </ChartContainer>
  );
});
