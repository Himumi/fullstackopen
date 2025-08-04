import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { DiaryWithoutComment, NewDiary } from './types';
import diaryServices from './services/diaries';

import NewDiaryForm from './components/NewDiaryForm';
import Diaries from './components/Diaries';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryWithoutComment[]>([]);
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const handleNotif = (message: string) => {
    setNotif(message);
    setTimeout(() => setNotif(null), 3000);
  };

  const errorHandler = (error: unknown) => {
    if (isAxiosError(error) && error.response !== undefined) {
      const messages = error.response.data.message.join(' ');
      handleNotif(messages);
    } else {
      handleNotif('unknown error');
    }
  };

  const handleCreate = async (newDiary: NewDiary) => {
    try {
      const diary = await diaryServices.createDiary(newDiary);
      delete diary.comment;

      setDiaries([...diaries, diary]);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const notifStyles = {
    color: 'red',
  };

  return (
    <div>
      <div style={notifStyles}>{notif}</div>
      <h2>Add new entry</h2>
      <NewDiaryForm handleCreate={handleCreate} />
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
