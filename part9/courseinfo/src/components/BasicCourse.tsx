import type { CourseProps } from '../props';

const BasicCourse = (props: CourseProps) => {
  const { course } = props;

  if (course.kind !== 'basic') {
    return null;
  }

  return (
    <p>
      <strong>
        {course.name} {course.exerciseCount}
      </strong>
      <br />
      {course.description}
    </p>
  );
};

export default BasicCourse;
