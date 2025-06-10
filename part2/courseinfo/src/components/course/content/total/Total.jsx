const Total = ({ parts }) => {
  const reducer = (accumulator, part) => accumulator + part.exercises;
  const total = parts.reduce(reducer, 0);

  return <p><b>total of {total} exercises</b></p>
};

export default Total;