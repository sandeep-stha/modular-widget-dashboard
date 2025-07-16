import type { ChartConfig } from '@/components/ui/chart';

const CHART_CONFIG_VARIANT_1 = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_1 = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const CHART_CONFIG_VARIANT_2 = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_2 = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const CHART_CONFIG_VARIANT_3 = {
  visitors: {
    label: 'Visitors',
    color: 'var(--chart-2)',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_3 = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const CHART_CONFIG_VARIANT_4 = {
  running: {
    label: 'Running',
    color: 'var(--chart-1)',
  },
  swimming: {
    label: 'Swimming',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_4 = [
  { date: '2025-11-06', running: 450, swimming: 300 },
  { date: '2025-11-07', running: 380, swimming: 420 },
  { date: '2025-11-08', running: 520, swimming: 120 },
  { date: '2025-11-09', running: 140, swimming: 550 },
  { date: '2025-11-10', running: 600, swimming: 350 },
  { date: '2025-11-11', running: 480, swimming: 400 },
];

export {
  CHART_CONFIG_VARIANT_1,
  CHART_CONFIG_VARIANT_2,
  CHART_CONFIG_VARIANT_3,
  CHART_CONFIG_VARIANT_4,
  CHART_DATA_VARIANT_1,
  CHART_DATA_VARIANT_2,
  CHART_DATA_VARIANT_3,
  CHART_DATA_VARIANT_4,
};
