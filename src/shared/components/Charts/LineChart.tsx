import { memo } from 'react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as ReChartsLineChart,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_3,
  CHART_DATA_VARIANT_3,
} from '@/shared/constants';
import { generateRandomHexColorCode } from '@/shared/utils';

import type { BaseChartDataPropsType } from './types-chart';

export const LineChart = memo(function LineChartComponent({
  data = CHART_DATA_VARIANT_3,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_3>) {
  const initialDataKey = (Object.keys(data?.[0]) ?? [])?.[0];
  const initialChartConfigKey = (Object.keys(CHART_CONFIG_VARIANT_3) ??
    [])?.[0];
  return (
    <ChartContainer
      className="min-h-[200px] w-full"
      config={CHART_CONFIG_VARIANT_3}
    >
      <ReChartsLineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 24,
          left: 24,
          right: 24,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              nameKey={initialChartConfigKey}
              hideLabel
            />
          }
        />
        <Line
          dataKey={initialChartConfigKey}
          type="natural"
          stroke={
            CHART_CONFIG_VARIANT_3?.[
              initialChartConfigKey as keyof typeof CHART_CONFIG_VARIANT_3
            ]?.color ?? generateRandomHexColorCode()
          }
          strokeWidth={2}
          dot={{
            fill:
              CHART_CONFIG_VARIANT_3?.[
                initialChartConfigKey as keyof typeof CHART_CONFIG_VARIANT_3
              ]?.color ?? generateRandomHexColorCode(),
          }}
          activeDot={{
            r: 6,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            dataKey={initialDataKey}
            formatter={(value: keyof typeof CHART_CONFIG_VARIANT_3) =>
              CHART_CONFIG_VARIANT_3[value]?.label
            }
          />
        </Line>
      </ReChartsLineChart>
    </ChartContainer>
  );
});
