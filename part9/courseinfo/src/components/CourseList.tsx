interface Course {
  name: string;
  exerciseCount: number;
}

interface CourseListProps {
  courses: Course[];
}
const CourseList = (props: CourseListProps) => {
  const { courses } = props;

  return (
    <div>
      {courses.map((course: Course) => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default CourseList;
