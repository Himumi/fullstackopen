import { useEffect, useState } from 'react';

import type { DiaryWithoutComment, NewDiary } from './types';
import diaryServices from './services/diaries';

import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryWithoutComment[]>([]);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const handleCreate = async (newDiary: NewDiary) => {
    const diary = await diaryServices.createDiary(newDiary);
    delete diary.comment;

    setDiaries([...diaries, diary]);
  };

  return (
    <div>
      <NewDiaryForm handleCreate={handleCreate} />
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
