export const isNotNumber = (input: any): boolean => {
  return !isNaN(Number(input));
};

export const areArgumentsNumber = (inputs: any[]): boolean => {
  return inputs.every((e) => isNotNumber(e));
};

export const checksArguments = (inputs: any[], message: string) => {
  if (!areArgumentsNumber(inputs)) {
    throw new Error(message);
  }
};
