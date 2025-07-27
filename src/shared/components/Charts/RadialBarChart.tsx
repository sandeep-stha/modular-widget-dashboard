import { memo } from 'react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart as ReChartsRadialBarChart,
} from 'recharts';

import { ChartContainer } from '@/components/ui/chart';

import { generateChartConfigAndDataVariant3Util } from './utils';

import type { BaseChartDataPropsType } from './types-chart';
import type { FieldValues } from 'react-hook-form';

export const RadialBarChart = memo(function RadialBarChartComponent({
  chartPayload,
}: BaseChartDataPropsType) {
  const { config, data } = generateChartConfigAndDataVariant3Util(chartPayload);

  const initialChartConfigKey = (Object.keys(config) ?? [])?.[0];

  return (
    <ChartContainer
      config={config}
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
        <RadialBar
          dataKey={initialChartConfigKey}
          background
          cornerRadius={10}
        />
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
                      {(data[0] as FieldValues)?.[
                        `${initialChartConfigKey?.[0] as string}`
                      ]?.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {initialChartConfigKey}
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
