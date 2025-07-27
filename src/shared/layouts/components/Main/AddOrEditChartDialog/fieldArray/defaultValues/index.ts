const valueDefaultValues = {
  value: '',
};

const subCategoryDefaultValues = {
  label: '',
  values: [valueDefaultValues],
};

const entriesDefaultValues = {
  title: '',
  color: '',
};

const defaultValues = {
  category: '',
  entries: [entriesDefaultValues],
  subCategory: [subCategoryDefaultValues],
};

export {
  defaultValues,
  entriesDefaultValues,
  subCategoryDefaultValues,
  valueDefaultValues,
};
