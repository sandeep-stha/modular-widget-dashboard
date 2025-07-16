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

import type { BaseChartDataPropsType } from './types-chart';

export const LineChart = memo(function LineChartComponent({
  data = CHART_DATA_VARIANT_3,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_3>) {
  return (
    <ChartContainer config={CHART_CONFIG_VARIANT_3}>
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
              nameKey="visitors"
              hideLabel
            />
          }
        />
        <Line
          dataKey="visitors"
          type="natural"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={{
            fill: 'var(--color-visitors)',
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
            dataKey="browser"
            formatter={(value: keyof typeof CHART_CONFIG_VARIANT_3) =>
              CHART_CONFIG_VARIANT_3[value]?.label
            }
          />
        </Line>
      </ReChartsLineChart>
    </ChartContainer>
  );
});
