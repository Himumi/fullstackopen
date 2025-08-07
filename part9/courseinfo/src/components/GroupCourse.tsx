import type { CourseProps } from '../props';

const GroupCourse = (props: CourseProps) => {
  const { course } = props;

  if (course.kind !== 'group') {
    return null;
  }

  return (
    <p>
      <strong>
        {course.name} {course.exerciseCount}
      </strong>
      <br />
      project exercises {course.groupProjectCount}
    </p>
  );
};

export default GroupCourse;
