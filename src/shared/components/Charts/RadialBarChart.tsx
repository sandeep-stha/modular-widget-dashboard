import { memo } from 'react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart as ReChartsRadialBarChart,
} from 'recharts';

import { ChartContainer } from '@/components/ui/chart';
import {
  CHART_CONFIG_VARIANT_2,
  CHART_DATA_VARIANT_2,
} from '@/shared/constants';

import type { BaseChartDataPropsType } from './types-chart';

export const RadialBarChart = memo(function RadialBarChartComponent({
  data = CHART_DATA_VARIANT_2,
}: BaseChartDataPropsType<typeof CHART_DATA_VARIANT_2>) {
  return (
    <ChartContainer
      config={CHART_CONFIG_VARIANT_2}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <ReChartsRadialBarChart
        data={data}
        startAngle={0}
        endAngle={250}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {data[0].visitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </ReChartsRadialBarChart>
    </ChartContainer>
  );
});
