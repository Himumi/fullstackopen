import Part from './part/Part';
import Total from './total/Total';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => 
        <Part key={part.id} part={part} />
      )}
      <Total parts={parts} />
    </div>
  );
};

export default Content;