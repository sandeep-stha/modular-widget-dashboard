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
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

import { generateChartConfigAndDataVariant2Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';

export const LineChart = memo(function LineChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant2Util(chartPayload);

  const initialDataKey = (Object.keys(data?.[0]) ?? [])?.[0];
  const initialChartConfigKey = (Object.keys(config) ?? [])?.[0];

  return (
    <ChartContainer className="min-h-[200px] w-full" config={config}>
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
            config?.[initialChartConfigKey as keyof typeof config]?.color ??
            generateRandomHexColorCodeUtil()
          }
          strokeWidth={2}
          dot={{
            fill:
              config?.[initialChartConfigKey as keyof typeof config]?.color ??
              generateRandomHexColorCodeUtil(),
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
            formatter={(value: keyof typeof config) => config[value]?.label}
          />
        </Line>
      </ReChartsLineChart>
    </ChartContainer>
  );
});
