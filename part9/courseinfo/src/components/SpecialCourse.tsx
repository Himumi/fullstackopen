import type { CourseProps } from '../props';

const SpecialCourse = (props: CourseProps) => {
  const { course } = props;

  if (course.kind !== 'special') {
    return null;
  }

  return (
    <p>
      <strong>
        {course.name} {course.exerciseCount}
      </strong>
      <br />
      {course.description}
      <br />
      required skils: {course.requirements.join(', ')}
    </p>
  );
};

export default SpecialCourse;
