import { checksArguments } from '../helpers/helper';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const countExercisesDays = (days: number[]): number => {
  const countDays = (counter: number, day: number) =>
    day === 0 ? counter : counter + 1;

  return days.reduce(countDays, 0);
};

const totalHours = (days: number[]): number => {
  return days.reduce((accumulator, day) => accumulator + day, 0);
};

const calAverage = (total: number, length: number): number => {
  return total / length;
};

const calTrainingAverage = (days: number[]): number => {
  return calAverage(totalHours(days), days.length);
};

const rateExercises = (totalHours: number): number => {
  if (totalHours <= 10) {
    return 1;
  } else if (totalHours <= 20) {
    return 2;
  }
  return 3;
};

const describeRating = (rate: number): string => {
  switch (rate) {
    case 1:
      return 'you need more sweat';
    case 2:
      return 'not too bad, but you could do more';
    default:
      return 'marvelous';
  }
};

export const calculateExercises = (days: number[], target: number): Result => {
  const trainingDays = countExercisesDays(days);
  const average = calTrainingAverage(days);
  const total = totalHours(days);
  const rating = rateExercises(total);
  const ratingDescription = describeRating(rating);

  return {
    periodLength: days.length,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  checksArguments(process.argv.slice(2), 'Arguments must numbers');

  const target: number = Number(process.argv[2]);
  const days: number[] = process.argv.slice(3).map(n => Number(n));
  const exercisesReport: Result = calculateExercises(days, target);

  console.log(exercisesReport);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
