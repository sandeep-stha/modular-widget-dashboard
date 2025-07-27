import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { numberOnlyRegex } from '@/shared/constants/constant-regex';

import { entriesDefaultValues, valueDefaultValues } from './defaultValues';

import type { ChartDataFormPropsType } from '../../types-customDialog';

export function ChartDataForm({ parentIndex }: ChartDataFormPropsType) {
  const { control, watch, setValue } = useFormContext();

  const entriesWatch = watch('entries');

  const noOfDataEntries = (entriesWatch ?? [])?.length;
  const { fields: dataFields } = useFieldArray({
    control,
    name: `subCategory.${parentIndex}.values`,
  });

  useEffect(() => {
    const valuesKey = `subCategory.${parentIndex}.values`;
    const current = dataFields ?? [];
    const diff = noOfDataEntries - current.length;

    if (diff === 0) return;

    const newArray = Array.from({ length: noOfDataEntries }, (_, i) => {
      return current[i] ?? { ...valueDefaultValues };
    });

    setValue(valuesKey, newArray);
  }, [noOfDataEntries, parentIndex, dataFields, setValue]);

  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
      {dataFields.map((dataItm, dataIdx) => (
        <FormField
          control={control}
          key={dataItm.id}
          name={`subCategory.${parentIndex}.values.${dataIdx}.value`}
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>
                {`Value for ${(entriesWatch?.[dataIdx] as typeof entriesDefaultValues)?.title}  entry no. ${parentIndex + 1}`}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter value (Eg:- 1000)"
                  type="number"
                  value={value as number}
                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  onChange={(e) => {
                    let value = e.target.value;

                    if (value.startsWith('.')) {
                      value = '0' + value;
                    }

                    if (numberOnlyRegex.test(value) || value !== '.') {
                      onChange(+value);
                    } else if (`${value}` === '0') {
                      onChange(0);
                    }
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
