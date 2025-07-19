import type { UniqueIdentifier } from '@dnd-kit/core';

export function modifyInputDataUtil(
  input?: UniqueIdentifier | string | number,
  options?: {
    replace?: string[];
    popAfterLastMatch?: string;
  }
): string | number | undefined {
  if (!input) return undefined;

  const initialInputType = typeof input;

  let parsedIdentifierID = input.toString();

  if (options?.replace?.length) {
    for (const replaceValue of options.replace) {
      parsedIdentifierID = parsedIdentifierID.replaceAll(replaceValue, '');
    }
  }

  if (
    options?.popAfterLastMatch &&
    parsedIdentifierID.includes(options.popAfterLastMatch)
  ) {
    const splitInputByMatchArr =
      parsedIdentifierID.split(options.popAfterLastMatch) ?? [];

    const resultAfterLastMatchedElementOmission = splitInputByMatchArr?.slice(
      0,
      -1
    );

    parsedIdentifierID =
      resultAfterLastMatchedElementOmission?.length > 1
        ? resultAfterLastMatchedElementOmission?.join(
            options?.popAfterLastMatch
          )
        : resultAfterLastMatchedElementOmission?.[0];
  }

  return initialInputType === 'number'
    ? +parsedIdentifierID
    : parsedIdentifierID;
}
