import type { CoursePart } from './types';

export interface CourseListProps {
  courses: CoursePart[];
}

export interface CourseProps {
  course: CoursePart;
}

export interface HeaderProps {
  title: string;
}

export interface TotalExercisesProps {
  total: number;
}
