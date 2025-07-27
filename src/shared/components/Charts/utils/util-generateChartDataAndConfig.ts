import {
  CHART_CONFIG_VARIANT_1,
  CHART_CONFIG_VARIANT_2,
  CHART_DATA_VARIANT_1,
  CHART_DATA_VARIANT_2,
} from '@/shared/constants';
import { generateRandomHexColorCodeUtil } from '@/shared/utils';

type ChartConfigType = Record<string, { label: string; color?: string }>;

type ChartPayloadValuesType = {
  value: number;
};

type ChartPayloadSubCategoryType = {
  label: string;
  values: ChartPayloadValuesType[];
};

type ChartPayloadEntriesType = {
  title: string;
  color: string;
};

type ChartPayloadType = {
  category: string;
  entries: ChartPayloadEntriesType[];
  subCategory: ChartPayloadSubCategoryType[];
};

function generateChartConfigVariant1Util(
  chartPayload: ChartPayloadType
): ChartConfigType {
  const { entries } = chartPayload ?? {};
  const acc: ChartConfigType = {};

  for (const entry of entries) {
    const key = entry.title;
    acc[key] = {
      label: entry.title,
      color: entry.color ?? generateRandomHexColorCodeUtil(),
    };
  }

  return acc;
}

function generateChartConfigVariant2Util(
  chartPayload: ChartPayloadType
): ChartConfigType {
  const { entries } = chartPayload ?? {};
  const acc: ChartConfigType = {
    [entries?.[0]?.title]: {
      label: entries?.[0]?.title,
      color: entries?.[0]?.color ?? generateRandomHexColorCodeUtil(),
    },
  };

  for (const entry of entries) {
    const key = entry.title;
    acc[key] = {
      label: entry.title,
      color: entry.color,
    };
  }

  return acc;
}

function generateChartConfigVariant3Util(
  chartPayload: ChartPayloadType
): ChartConfigType {
  const { entries, subCategory } = chartPayload ?? {};
  const config: ChartConfigType = {};

  if (!entries?.length || !subCategory?.length) return config;

  const mainEntry = entries[0];
  config[mainEntry.title] = {
    label: mainEntry.title.charAt(0).toUpperCase() + mainEntry.title.slice(1),
  };

  for (const [i, sub] of subCategory.entries()) {
    const entry = entries[i];

    const key = sub.label.toLowerCase();

    config[key] = {
      label: sub.label,
      color: entry?.color ?? generateRandomHexColorCodeUtil(),
    };
  }

  return config;
}

function generateChartDataVariant1Util(chartPayload: ChartPayloadType) {
  const { category, entries, subCategory } = chartPayload ?? {};

  const modifiedPayload = subCategory?.map((subCatItm) => {
    const row = {
      [category]: subCatItm?.label,
    };

    for (const [entryIdx, entryItm] of entries.entries()) {
      row[entryItm.title] = (subCatItm?.values?.[entryIdx]?.value ??
        0) as unknown as string;
    }

    return row;
  });

  return modifiedPayload;
}

function generateChartDataVariant2Util(chartPayload: ChartPayloadType) {
  const { category, entries, subCategory } = chartPayload ?? {};

  const modifiedPayload = subCategory?.map((subCatItm) => {
    const row = {
      [category]: subCatItm?.label,
    };

    //For dataVariant2, entries should only be one object [or one object inside array to keep it consistent]

    for (const [entryIdx, entryItm] of entries.entries()) {
      row[entryItm.title] = (subCatItm?.values?.[entryIdx]?.value ??
        0) as unknown as string;

      row['fill'] = entryItm?.color ?? generateRandomHexColorCodeUtil();
    }

    return row;
  });

  return modifiedPayload;
}

function generateChartDataVariant3Util(chartPayload: ChartPayloadType) {
  const { category, entries, subCategory } = chartPayload ?? {};
  const chartData = [];

  if (!category || !entries?.length || !subCategory?.length) return [];

  for (const [i, sub] of subCategory.entries()) {
    const entry = entries[i];

    const row = {
      [category]: sub.label.toLowerCase(),
      [entries[0].title]: sub.values?.[0]?.value ?? 0,
      fill: entry?.color ?? generateRandomHexColorCodeUtil(),
    };

    chartData.push(row);
  }

  return chartData;
}

function generateChartConfigAndDataVariant1Util(
  chartPayload?: ChartPayloadType
) {
  return {
    config: chartPayload
      ? generateChartConfigVariant1Util(chartPayload)
      : CHART_CONFIG_VARIANT_1,
    data: chartPayload
      ? generateChartDataVariant1Util(chartPayload)
      : CHART_DATA_VARIANT_1,
  };
}

function generateChartConfigAndDataVariant2Util(
  chartPayload?: ChartPayloadType
) {
  return {
    config: chartPayload
      ? generateChartConfigVariant2Util(chartPayload)
      : CHART_CONFIG_VARIANT_2,
    data: chartPayload
      ? generateChartDataVariant2Util(chartPayload)
      : CHART_DATA_VARIANT_2,
  };
}

function generateChartConfigAndDataVariant3Util(
  chartPayload?: ChartPayloadType
) {
  return {
    config: chartPayload
      ? generateChartConfigVariant3Util(chartPayload)
      : CHART_CONFIG_VARIANT_2,
    data: chartPayload
      ? generateChartDataVariant3Util(chartPayload)
      : CHART_DATA_VARIANT_2,
  };
}

export type { ChartPayloadType };

export {
  generateChartConfigAndDataVariant1Util,
  generateChartConfigAndDataVariant2Util,
  generateChartConfigAndDataVariant3Util,
};
