export function removeFalsyPropertiesUtil<T extends object>(
  obj: T,
  options?: Partial<{
    keepFalse: boolean;
    keepZero: boolean;
    keepStringZero: boolean;
  }>
): Partial<T> {
  const {
    keepFalse = true,
    keepZero = true,
    keepStringZero = true,
  } = options ?? {};

  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    const isFalsy =
      value === null ||
      value === undefined ||
      value === '' ||
      value === 'null' ||
      value === 'undefined' ||
      (!keepFalse && value === false) ||
      (!keepZero && value === 0) ||
      (!keepStringZero && value === '0');

    if (!isFalsy) {
      result[key as keyof T] = value;
    }
  }

  return result;
}
