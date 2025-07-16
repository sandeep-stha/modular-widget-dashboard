import { v4 as uuidv4 } from 'uuid';

import { EDashboardChartComponentVariants } from '../enums';

const DASHBOARD_CHART_COMPONENT_LIST = [
  {
    id: uuidv4(),
    title: 'Area Chart',
    description: 'Area Chart',
    type: EDashboardChartComponentVariants.AREA_CHART,
  },

  {
    id: uuidv4(),
    title: 'Bar Chart',
    description: 'Bar Chart',
    type: EDashboardChartComponentVariants.BAR_CHART,
  },

  {
    id: uuidv4(),
    title: 'Line Chart',
    description: 'Line Chart',
    type: EDashboardChartComponentVariants.LINE_CHART,
  },

  {
    id: uuidv4(),
    title: 'Pie Chart',
    description: 'Pie Chart',
    type: EDashboardChartComponentVariants.PIE_CHART,
  },

  {
    id: uuidv4(),
    title: 'Radial Chart',
    description: 'Radial Chart',
    type: EDashboardChartComponentVariants.RADIAL_BAR_CHART,
  },

  {
    id: uuidv4(),
    title: 'Stacked Bar Chart',
    description: 'Stacked Bar Chart',
    type: EDashboardChartComponentVariants.STACKED_BAR_CHART,
  },
];

const DASHBOARD_CHART_COMPONENT_LIST_DROPPABLE_ZONE_ID =
  'Dynamic-Components-List-Render-Zone';

const DASHBOARD_CHART_COMPONENT_LIST_SORTABLE_ZONE_ID =
  'Dynamic-Components-List--Sortable-Zone-Render-Zone';

export {
  DASHBOARD_CHART_COMPONENT_LIST,
  DASHBOARD_CHART_COMPONENT_LIST_DROPPABLE_ZONE_ID,
  DASHBOARD_CHART_COMPONENT_LIST_SORTABLE_ZONE_ID,
};
