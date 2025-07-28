import type { ChartConfig } from '@/components/ui/chart';

import { generateRandomHexColorCodeUtil } from '../utils';
import { generateRandomNumberUtil } from '../utils/util-generateRandomNumber';

const CHART_CONFIG_VARIANT_1 = {
  data1: {
    label: 'Data1',
    color: generateRandomHexColorCodeUtil(),
  },
  data2: {
    label: 'Data2',
    color: generateRandomHexColorCodeUtil(),
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_1 = [
  {
    month: 'Group1',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
  {
    month: 'Group2',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
  {
    month: 'Group3',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
  {
    month: 'Group4',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
  {
    month: 'Group5',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
  {
    month: 'Group6',
    data1: generateRandomNumberUtil(),
    data2: generateRandomNumberUtil(),
  },
];

const CHART_CONFIG_VARIANT_2 = {
  category: {
    label: 'Category',
    color: generateRandomHexColorCodeUtil(),
  },
  data1: {
    label: 'Data1',
    color: generateRandomHexColorCodeUtil(),
  },
  data2: {
    label: 'Data2',
    color: generateRandomHexColorCodeUtil(),
  },
  data3: {
    label: 'Data3',
    color: generateRandomHexColorCodeUtil(),
  },
  data4: {
    label: 'Data4',
    color: generateRandomHexColorCodeUtil(),
  },
  data5: {
    label: 'Data5',
    color: generateRandomHexColorCodeUtil(),
  },
} satisfies ChartConfig;

const CHART_DATA_VARIANT_2 = [
  {
    group: 'data1',
    category: generateRandomNumberUtil(),
    fill: generateRandomHexColorCodeUtil(),
  },
  {
    group: 'data2',
    category: generateRandomNumberUtil(),
    fill: generateRandomHexColorCodeUtil(),
  },
  {
    group: 'data3',
    category: generateRandomNumberUtil(),
    fill: generateRandomHexColorCodeUtil(),
  },
  {
    group: 'data4',
    category: generateRandomNumberUtil(),
    fill: generateRandomHexColorCodeUtil(),
  },
  {
    group: 'data5',
    category: generateRandomNumberUtil(),
    fill: generateRandomHexColorCodeUtil(),
  },
];

export {
  CHART_CONFIG_VARIANT_1,
  CHART_CONFIG_VARIANT_2,
  CHART_DATA_VARIANT_1,
  CHART_DATA_VARIANT_2,
};
