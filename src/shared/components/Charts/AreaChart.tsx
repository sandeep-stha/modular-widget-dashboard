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
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

import type { BaseChartDataPropsType } from './types-chart';

export const AreaChart = memo(function AreaChartComponent({
  data = CHART_DATA_VARIANT_1,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_1>) {
  const dataKeys = Object.keys(data?.[0]) ?? [];

  return (
    <ChartContainer
      className="min-h-[200px] w-full"
      config={CHART_CONFIG_VARIANT_1}
    >
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

        {dataKeys?.slice(1)?.map((dataItm, dataIdx) => (
          <Area
            key={dataItm}
            dataKey={dataItm}
            type="natural"
            fill={`${dataIdx <= 5 ? `var(--chart-${dataIdx + 1})` : generateRandomHexColorCodeUtil()}`}
            fillOpacity={0.4}
            stroke={`${dataIdx <= 5 ? `var(--chart-${dataIdx + 1})` : generateRandomHexColorCodeUtil()}`}
            stackId="a"
          />
        ))}
      </ReChartsAreaChart>
    </ChartContainer>
  );
});
