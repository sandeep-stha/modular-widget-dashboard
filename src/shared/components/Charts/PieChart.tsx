import { memo } from 'react';
import { Pie, PieChart as ReChartsPieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { generateChartConfigAndDataVariant3Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';

export const PieChart = memo(function PieChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant3Util(chartPayload);

  const initialDataKey = (Object.keys(data?.[0]) ?? [])?.[0];
  const initialChartConfigKey = (Object.keys(config) ?? [])?.[0];

  return (
    <ChartContainer
      config={config}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
    >
      <ReChartsPieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey={initialChartConfigKey}
          label
          nameKey={initialDataKey}
        />
      </ReChartsPieChart>
    </ChartContainer>
  );
});
