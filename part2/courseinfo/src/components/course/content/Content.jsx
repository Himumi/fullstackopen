import Part from './part/Part';
import Total from './total/Total';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => 
        <Part key={index} part={part} />
      )}
      <Total parts={parts} />
    </div>
  );
};

export default Content;