import { Minus, Plus } from 'lucide-react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

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
import { Dialog } from '@/shared/components';

import type { CustomDialogPropsType } from './types-customDialog';

const chartDefaultValues = {
  data: '',
  color: '',
};

const defaultValues = {
  chart: [chartDefaultValues],
};

export function AddOrEditChartDataDialog({
  selectedItmId,

  open,
  handleOpenChange,

  primaryAction,
  secondaryAction,
}: CustomDialogPropsType) {
  const formMethods = useForm({
    defaultValues,
  });

  const { control } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chart',
  });

  return (
    <Dialog
      title={`${selectedItmId ? 'Add New' : 'Edit'} Data`}
      description="Provide proper information for better accurate representation"
      open={open}
      handleOpenChange={handleOpenChange}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    >
      <FormProvider {...formMethods}>
        <div className="flex flex-col gap-y-4">
          {fields?.map((_, idx) => {
            const isFirstItemOutOfMultiple = fields?.length > 1 && idx === 0;
            const isLastItem = idx === fields.length - 1;

            const fieldArrayFunctionProps = {
              isLastItem,
              idx,
            };

            return (
              <div
                key={idx}
                className="flex flex-row justify-between items-start gap-x-4"
              >
                <FormField
                  control={control}
                  name={`chart.${idx}.data`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Data {idx + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chart data" {...field} />
                      </FormControl>
                      <FormDescription>
                        {`This is your display data no. ${idx + 1}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`chart.${idx}.color`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Color {idx + 1}</FormLabel>
                      <FormControl>
                        <Input
                          type="color"
                          placeholder="Pick a color to represent in chart"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {` This is your public display name no. ${idx + 1}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className={`mt-6 w-28 py-1 rounded-2xl ${
                    isFirstItemOutOfMultiple && 'hidden'
                  }`}
                  onClick={() =>
                    handleFieldArrayAppendOrRemove(fieldArrayFunctionProps)
                  }
                >
                  {isLastItem ? (
                    <>
                      <Plus className="w-4 h-4" />
                      Add
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4" />
                      Remove
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </FormProvider>
    </Dialog>
  );

  function handleFieldArrayAppendOrRemove({
    isLastItem,
    idx,
  }: {
    isLastItem?: boolean;
    idx: number;
  }) {
    if (isLastItem) {
      return append(chartDefaultValues);
    } else if (idx > 0) {
      remove(idx);
    }
  }
}
