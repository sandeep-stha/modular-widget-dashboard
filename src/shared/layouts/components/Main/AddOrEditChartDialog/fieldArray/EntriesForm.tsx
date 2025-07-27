import { Minus, Plus } from 'lucide-react';
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

import { entriesDefaultValues } from './defaultValues';

export function EntriesForm({
  chartType,
}: {
  chartType?: keyof typeof EDashboardChartComponentVariants;
}) {
  const { control } = useFormContext();

  const {
    fields: entriesFields,
    append: entriesAppend,
    remove: entriesRemove,
  } = useFieldArray({
    control,
    name: 'entries',
  });

  return (
    <div className="flex flex-col gap-y-4 border p-4 rounded-lg space-y-2">
      <p className="text-md font-medium">Data Entries</p>
      {entriesFields.map((entriesItm, entriesIdx) => (
        <div key={entriesItm.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex flex-row justify-between items-start gap-x-4">
            <FormField
              control={control}
              name={`entries.${entriesIdx}.title`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data title no. {entriesIdx + 1}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Data Title (Eg:- Desktop)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your actual data title no. {entriesIdx + 1}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`entries.${entriesIdx}.color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data color no. {entriesIdx + 1}</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is the color to represent the data no. {entriesIdx + 1}
                    .
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="button"
              className={`mt-6 w-28 py-1 rounded-2xl ${
                entriesIdx === 0 && 'hidden'
              }`}
              onClick={() => entriesRemove(entriesIdx)}
            >
              <Minus className="w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      ))}

      {renderAddEntriesButton()}
    </div>
  );

  function renderAddEntriesButton() {
    if (
      chartType === EDashboardChartComponentVariants?.LINE_CHART ||
      (chartType === EDashboardChartComponentVariants?.RADIAL_BAR_CHART &&
        entriesFields?.length >= 2) ||
      (chartType === EDashboardChartComponentVariants?.STACKED_BAR_CHART &&
        entriesFields?.length >= 2)
    ) {
      return null;
    }
    return (
      <Button
        className="mx-auto w-40 py-1 rounded-2xl"
        type="button"
        onClick={handleFieldArrayAppend}
      >
        <Plus className="w-4 h-4" />
        Add Entries
      </Button>
    );
  }

  function handleFieldArrayAppend() {
    entriesAppend(entriesDefaultValues);
  }
}
