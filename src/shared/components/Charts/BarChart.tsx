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
import {
  CHART_CONFIG_VARIANT_1,
  CHART_DATA_VARIANT_1,
} from '@/shared/constants';
import { generateRandomHexColorCode } from '@/shared/utils';

import type { BaseChartDataPropsType } from './types-chart';

export const BarChart = memo(function BarChartComponent({
  data = CHART_DATA_VARIANT_1,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_1>) {
  const dataKeys = Object.keys(data?.[0]) ?? [];

  return (
    <ChartContainer
      className="min-h-[200px] w-full"
      config={CHART_CONFIG_VARIANT_1}
    >
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
        {dataKeys?.slice(1)?.map((dataItm, dataIdx) => (
          <Bar
            key={dataItm}
            dataKey={dataItm}
            fill={`${dataIdx <= 5 ? `var(--chart-${dataIdx + 1})` : generateRandomHexColorCode()}`}
            radius={4}
          />
        ))}
      </ReChartsBarChart>
    </ChartContainer>
  );
});
