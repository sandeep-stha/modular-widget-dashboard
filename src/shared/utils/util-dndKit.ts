import type { UniqueIdentifier } from '@dnd-kit/core';

export function modifyInputDataUtil(
  input?: UniqueIdentifier | string | number,
  options?: {
    replace?: string[];
    removeAfterLastMatch?: string;
  }
): string | undefined {
  if (!input) return undefined;

  let parsedIdentifierID = input.toString();

  if (options?.replace?.length) {
    for (const replaceValue of options.replace) {
      parsedIdentifierID = parsedIdentifierID.replaceAll(replaceValue, '');
    }
  }

  if (
    options?.removeAfterLastMatch &&
    parsedIdentifierID.includes(options.removeAfterLastMatch)
  ) {
    const splitInputByMatchArr =
      parsedIdentifierID.split(options.removeAfterLastMatch) ?? [];

    parsedIdentifierID = splitInputByMatchArr
      ?.slice(0, -1)
      ?.join(options?.removeAfterLastMatch);
  }

  return parsedIdentifierID;
}
