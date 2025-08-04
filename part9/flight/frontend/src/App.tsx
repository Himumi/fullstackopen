import axios from 'axios';
import { useEffect, useState } from 'react';

import type { DiaryWithoutComment } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryWithoutComment[]>([]);
  const baseUrl = 'http://localhost:3000/api/diaries';

  useEffect(() => {
    axios
      .get<DiaryWithoutComment[]>(baseUrl)
      .then((response) => setDiaries(response.data));
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
