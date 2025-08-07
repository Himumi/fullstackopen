import BasicCourse from './BasicCourse';
import GroupCourse from './GroupCourse';
import BackgroundCourse from './BackgroundCourse';

import type { CourseListProps } from '../props';
import SpecialCourse from './SpecialCourse';

const CourseList = (props: CourseListProps) => {
  const { courses } = props;

  return (
    <div>
      {courses.map((course) => {
        switch (course.kind) {
          case 'basic':
            return <BasicCourse course={course} />;
          case 'group':
            return <GroupCourse course={course} />;
          case 'background':
            return <BackgroundCourse course={course} />;
          case 'special':
            return <SpecialCourse course={course} />;
        }
      })}
    </div>
  );
};

export default CourseList;
