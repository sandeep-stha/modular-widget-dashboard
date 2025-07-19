import { Plus } from 'lucide-react';
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
import { useDroppedItemsStore } from '@/shared/stores';

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
  selectedItmType,

  open,
  handleOpenChange,

  primaryAction,
  secondaryAction,
}: CustomDialogPropsType) {
  const formMethods = useForm({
    defaultValues,
  });

  const { control, watch } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chart',
  });

  const { droppedItems } = useDroppedItemsStore();

  console.log('the watch is', watch());

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
          {fields?.map((_, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between items-start gap-x-4"
            >
              <FormField
                control={control}
                name={`chart.${idx}.data`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data {idx + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter chart data" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your display data.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`chart.${idx}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color {idx + 1}</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        placeholder="Pick a color to represent in chart"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {idx === fields?.length - 1 && (
                <Button
                  className="mt-6 px-4 py-1 rounded-2xl"
                  onClick={() => append(chartDefaultValues)}
                >
                  <Plus />
                  Add
                </Button>
              )}
            </div>
          ))}
        </div>
      </FormProvider>
    </Dialog>
  );
}
