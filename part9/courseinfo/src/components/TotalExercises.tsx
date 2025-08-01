import type { TotalExercisesProps } from '../props';

const TotalExercises = (props: TotalExercisesProps) => {
  return (
    <div>
      <p>Number of Exercises {props.total}</p>
    </div>
  );
};

export default TotalExercises;
