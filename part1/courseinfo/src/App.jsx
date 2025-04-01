const Header = (props) => 
  <h1>{
    props.course.name
  }</h1>

const Part = (props) => 
  <p>{props.part} {props.exercises}</p>;

const Content = (props) => {
  const [one, two, three] = props.parts;

  return (
    <div>
      <Part part={one.name} exercises={one.exercises} />
      <Part part={two.name} exercises={two.exercises} />
      <Part part={three.name} exercises={three.exercises} />
    </div>
  );
};

const Total = (props) => 
  <p>{props.total}</p>;


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundementals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const reducer = (accumulator, currentValue) => 
    accumulator + currentValue.exercises;

  const total = course.parts.reduce(reducer, 0);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default App;