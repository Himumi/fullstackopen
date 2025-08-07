import type { CourseProps } from '../props';

const BackgroundCourse = (props: CourseProps) => {
  const { course } = props;

  if (course.kind !== 'background') {
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
      {course.backgroundMaterial}
    </p>
  );
};

export default BackgroundCourse;
