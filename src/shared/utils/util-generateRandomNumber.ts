type RandomNumberOptions = {
  decimals?: boolean;
  roundUp?: boolean;
};

export function generateRandomNumberUtil(
  min: number = 0,
  max: number = 999,
  options: RandomNumberOptions = {}
): number {
  const { decimals = false, roundUp = false } = options;

  let random = Math.random() * (max - min) + min;

  if (!decimals) {
    random = roundUp ? Math.ceil(random) : Math.floor(random);
  }

  return random;
}
