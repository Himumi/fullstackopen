import type { DiaryWithoutComment } from '../types';

interface DiariesProps {
  diaries: DiaryWithoutComment[];
}

const Diaries = (props: DiariesProps) => {
  const { diaries } = props;

  return (
    <div>
      {diaries.map((d) => (
        <div
          key={d.id}
          style={{ border: '1px solid black', marginBottom: 10, padding: 5 }}
        >
          weather: {d.weather} <br />
          visibility: {d.visibility} <br />
          {d.date}
        </div>
      ))}
    </div>
  );
};

export default Diaries;
