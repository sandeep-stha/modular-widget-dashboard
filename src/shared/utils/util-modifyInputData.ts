import type { UniqueIdentifier } from '@dnd-kit/core';

type CapitalizeOptions = {
  firstLetter?: boolean;
  allInitialsAfterMatch?: string;
};

type ModifyOptions = {
  replace?: string[];
  popAfterLastMatch?: string;
  capitalize?: CapitalizeOptions;
};

export function modifyInputDataUtil(
  input?: UniqueIdentifier | string | number,
  options?: ModifyOptions
): string | number | undefined {
  if (input == null) return undefined;

  const inputType = typeof input;
  let value = String(input);

  if (options?.replace?.length) {
    for (const target of options.replace) {
      value = value.split(target).join('');
    }
  }

  if (options?.popAfterLastMatch && value.includes(options.popAfterLastMatch)) {
    const parts = value.split(options.popAfterLastMatch);
    parts.pop();
    value = parts.join(options.popAfterLastMatch);
  }

  if (inputType !== 'number' && options?.capitalize) {
    const { firstLetter, allInitialsAfterMatch } = options.capitalize;

    if (firstLetter && value.length > 0) {
      value = value[0].toUpperCase() + value.slice(1);
    }

    if (allInitialsAfterMatch) {
      const regex = new RegExp(`(${allInitialsAfterMatch})(\\w)`, 'g');
      value = value.replace(
        regex,
        (_, match, letter) => match + letter.toUpperCase()
      );
    }
  }

  return inputType === 'number' ? Number(value) : value;
}
