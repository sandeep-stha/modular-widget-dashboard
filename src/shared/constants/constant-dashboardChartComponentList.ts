import { EDashboardChartComponentVariants } from '../enums';

const DASHBOARD_CHART_COMPONENT_LIST = [
  {
    id: 1,
    title: 'Area Chart',
    description: 'Area Chart',
    type: EDashboardChartComponentVariants.AREA_CHART,
  },

  {
    id: 2,
    title: 'Bar Chart',
    description: 'Bar Chart',
    type: EDashboardChartComponentVariants.BAR_CHART,
  },

  {
    id: 3,
    title: 'Line Chart',
    description: 'Line Chart',
    type: EDashboardChartComponentVariants.LINE_CHART,
  },

  {
    id: 4,
    title: 'Pie Chart',
    description: 'Pie Chart',
    type: EDashboardChartComponentVariants.PIE_CHART,
  },

  {
    id: 5,
    title: 'Radial Chart',
    description: 'Radial Chart',
    type: EDashboardChartComponentVariants.RADIAL_BAR_CHART,
  },

  {
    id: 6,
    title: 'Stacked Bar Chart',
    description: 'Stacked Bar Chart',
    type: EDashboardChartComponentVariants.STACKED_BAR_CHART,
  },
];

export { DASHBOARD_CHART_COMPONENT_LIST };
