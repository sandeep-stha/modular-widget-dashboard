import type { ChartConfig } from '@/components/ui/chart';

const CHART_CONFIG_VARIANT_1 = {
  data1: {
    label: 'Data1',
    color: 'var(--chart-1)',
  },
  data2: {
    label: 'Data2',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_1 = [
  { month: 'Group1', data1: 186, data2: 80 },
  { month: 'Group2', data1: 305, data2: 200 },
  { month: 'Group3', data1: 237, data2: 120 },
  { month: 'Group4', data1: 73, data2: 190 },
  { month: 'Group5', data1: 209, data2: 130 },
  { month: 'Group6', data1: 214, data2: 140 },
];

const CHART_CONFIG_VARIANT_2 = {
  visitors: {
    label: 'Data1',
    color: 'var(--chart-2)',
  },
  data1: {
    label: '',
    color: 'var(--chart-1)',
  },
  data2: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  data3: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  data4: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  data5: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const CHART_CONFIG_VARIANT_3 = {
  visitors: {
    label: 'Visitors',
  },
  data1: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  data2: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  data3: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  data4: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  data5: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_2 = [
  { browser: 'data1', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'data2', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'data3', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'data4', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'data5', visitors: 90, fill: 'var(--color-other)' },
];

export {
  CHART_CONFIG_VARIANT_1,
  CHART_CONFIG_VARIANT_2,
  CHART_CONFIG_VARIANT_3,
  CHART_DATA_VARIANT_1,
  CHART_DATA_VARIANT_2,
};
