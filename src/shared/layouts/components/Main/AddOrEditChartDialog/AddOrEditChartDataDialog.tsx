import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

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
import type { ChartPayloadType } from '@/shared/components/Charts/utils';
import { useDroppedItemsStore } from '@/shared/stores';

import { removeFalsyPropertiesUtil } from '../../../../utils/util-removeFalseyProperties';

import { defaultValues } from './fieldArray/defaultValues';
import { EntriesForm } from './fieldArray/EntriesForm';
import { SubCategoryForm } from './fieldArray/SubCategoryForm';

import type { CustomDialogPropsType } from '../types-customDialog';

const valueSchema = z.object({
  value: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = Number(val);
        return Number.isNaN(parsed) ? val : parsed;
      }
      return val;
    },
    z.number().min(1, 'Data must be a number')
  ),
});

const subCategorySchema = z.object({
  label: z.string().min(1, 'Sub-category Label is required'),
  values: z.array(valueSchema).min(1, 'At least one data value is required'),
});

const entriesBaseSchema = z.object({
  title: z.string().min(1, ' Data Title is required'),
  color: z.string().min(1, 'Data Color is required'),
});

const formSchema = z.object({
  category: z.string().min(1, 'Category Label is required'),
  entries: z
    .array(entriesBaseSchema)
    .min(1, 'At least one data entry is required'),
  subCategory: z
    .array(subCategorySchema)
    .min(1, 'At least one subCategory item is required'),
});

export function AddOrEditChartDataDialog({
  selectedItm,
  open,
  handleOpenChange,
}: CustomDialogPropsType) {
  const { droppedItems, setDroppedItems } = useDroppedItemsStore();

  const formMethods = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { control, reset, handleSubmit } = formMethods;

  const currentDroppedItm = droppedItems?.find(
    (itm) => itm?.id === selectedItm?.id
  );

  useEffect(() => {
    if (currentDroppedItm?.data?.length) {
      const parsedResetObj = JSON.parse(currentDroppedItm?.data);
      reset(parsedResetObj);
    }
  }, [currentDroppedItm?.data, reset]);

  return (
    <Dialog
      title={`${selectedItm?.id ? 'Add New' : 'Edit'} Chart Data`}
      description="Provide proper information for better accurate representation"
      open={open}
      handleOpenChange={handleOpenChange}
      primaryAction={{
        label: 'Save Changes',
        handleFn: handleSubmit(handleDialogSubmit),
      }}
      secondaryAction={{
        label: 'Reset',
        handleFn: handleResetForm,
        preventClose: true,
      }}
    >
      <FormProvider {...formMethods}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={control}
            name={'category'}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Data Category (Eg:- Month)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the category your data belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <EntriesForm chartType={selectedItm?.metaData?.type} />

          <SubCategoryForm chartType={selectedItm?.metaData?.type} />
        </div>
      </FormProvider>
    </Dialog>
  );

  function handleResetForm() {
    reset(defaultValues);
  }

  function handleDialogSubmit(payload: ChartPayloadType) {
    const toReplaceIdx = droppedItems?.findIndex(
      (itm) => itm?.id === selectedItm?.id
    );

    const modifiedIndexData = {
      ...droppedItems?.[toReplaceIdx],
      data: JSON.stringify(removeFalsyPropertiesUtil(payload)),
    };

    const updatedItmsList = [
      ...droppedItems.slice(0, toReplaceIdx),
      modifiedIndexData,
      ...droppedItems.slice(toReplaceIdx + 1),
    ];

    setDroppedItems(updatedItmsList);

    reset(defaultValues);
    handleOpenChange();
  }
}
