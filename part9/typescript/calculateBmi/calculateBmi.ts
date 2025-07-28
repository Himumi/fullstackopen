import {checksArguments} from '../helpers/helper';

export const calculateBmi = (weight: number, height: number): number => {
  return weight / (height / 100) ** 2;
};

const isSevereThinness = (bmi: number): boolean => bmi < 16;
const isModerateThinness = (bmi: number): boolean => bmi >= 16 && bmi < 17;
const isMildThinness = (bmi: number): boolean => bmi >= 17 && bmi < 18.5;
const isNormal = (bmi: number): boolean => bmi >= 18.5 && bmi < 25;
const isOverweight = (bmi: number): boolean => bmi >= 25 && bmi < 30;
const isObeseI = (bmi: number): boolean => bmi >= 30 && bmi < 35;
const isObeseII = (bmi: number): boolean => bmi >= 35 && bmi < 40;

export const bmiCategory = (bmi: number): string => {
  switch (true) {
    case isSevereThinness(bmi):
      return 'Underweight (Severe thinness)';
    case isModerateThinness(bmi):
      return 'Underweight (Moderate thinness)';
    case isMildThinness(bmi):
      return 'Underweight (Mild thinness)';
    case isNormal(bmi):
      return 'Normal range';
    case isOverweight(bmi):
      return 'Overweight (Pre-obese)';
    case isObeseI(bmi):
      return 'Obese (Class I)';
    case isObeseII(bmi):
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
};

try {
  checksArguments(process.argv.slice(2), 'Arguments must numbers');

  const weight: number = Number(process.argv[2]);
  const height: number = Number(process.argv[3]);

  const bmi: number = calculateBmi(weight, height);
  const category: string = bmiCategory(bmi);

  console.log(category);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
