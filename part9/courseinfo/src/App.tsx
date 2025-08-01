import Header from './components/Header';
import CourseList from './components/CourseList';
import TotalExercises from './components/TotalExercises';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header title={courseName} />
      <CourseList courses={courseParts} />
      <TotalExercises total={totalExercises} />
    </div>
  );
};

export default App;
