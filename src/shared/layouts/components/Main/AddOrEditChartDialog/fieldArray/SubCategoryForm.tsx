import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EDashboardChartComponentVariants } from '@/shared/enums';

import { ChartDataForm } from './ChartDataForm';
import { subCategoryDefaultValues } from './defaultValues';

export function SubCategoryForm({
  chartType,
}: {
  chartType?: keyof typeof EDashboardChartComponentVariants;
}) {
  const { control, watch } = useFormContext();
  const {
    fields: subCategoryFields,
    append: subCategoryAppend,
    remove: subCategoryRemove,
  } = useFieldArray({
    control,
    name: 'subCategory',
  });

  const entriesWatch = watch('entries');

  useEffect(() => {
    if (
      (chartType === EDashboardChartComponentVariants?.PIE_CHART ||
        chartType === EDashboardChartComponentVariants?.RADIAL_BAR_CHART) &&
      subCategoryFields?.length &&
      entriesWatch?.length
    ) {
      if (
        subCategoryFields?.length > entriesWatch?.length &&
        subCategoryFields?.length > 1
      ) {
        subCategoryRemove(subCategoryFields?.length - 1);
      } else if (subCategoryFields < entriesWatch) {
        handleFieldArrayAppend();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType, entriesWatch, subCategoryFields]);

  return (
    <div className="contents">
      {subCategoryFields.map((subCategoryItm, subCategoryIdx) => (
        <div
          key={subCategoryItm.id}
          className="w-full border p-4 rounded-lg space-y-4"
        >
          <div className="flex flex-row justify-between items-start gap-x-4">
            <FormField
              control={control}
              name={`subCategory.${subCategoryIdx}.label`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Group label no. {subCategoryIdx + 1}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Group Label (Eg:- January)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the group label no. {subCategoryIdx + 1}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {chartType !== EDashboardChartComponentVariants?.PIE_CHART &&
              chartType !==
                EDashboardChartComponentVariants?.RADIAL_BAR_CHART && (
                <Button
                  type="button"
                  className={`mt-6 w-28 py-1 rounded-2xl ${
                    subCategoryIdx === 0 && 'hidden'
                  }`}
                  onClick={() => subCategoryRemove(subCategoryIdx)}
                >
                  <Minus className="w-4 h-4" />
                  Remove
                </Button>
              )}
          </div>

          <ChartDataForm parentIndex={subCategoryIdx} />

          {renderAddSubCategoriesButton(subCategoryIdx)}
        </div>
      ))}
    </div>
  );

  function renderAddSubCategoriesButton(idx: number) {
    if (
      chartType === EDashboardChartComponentVariants.RADIAL_BAR_CHART &&
      subCategoryFields?.length >= 2
    ) {
      return null;
    }

    if (idx == subCategoryFields?.length - 1) {
      return (
        <Button
          className="flex mx-auto mt-6 w-40 py-1 rounded-2xl"
          type="button"
          onClick={handleFieldArrayAppend}
        >
          <Plus className="w-4 h-4" />
          Add Subcategory
        </Button>
      );
    }
  }

  function handleFieldArrayAppend() {
    subCategoryAppend(subCategoryDefaultValues);
  }
}
