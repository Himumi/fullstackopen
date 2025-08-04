import { useEffect, useState } from 'react';

import type { DiaryWithoutComment } from './types';
import diaryServices from './services/diaries';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryWithoutComment[]>([]);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

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

export default App;
