import { useState } from 'react';
import type { NewDiary, Visibility, Weather } from '../types';

interface NewDiaryFormProps {
  handleCreate: (newDiary: NewDiary) => void;
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleChange = (f: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.FormEvent<HTMLInputElement>) => {
      console.log(event.currentTarget.value);
      const value = event.currentTarget.value;
      f.call(null, value);
    };
  };

  const handleDate = handleChange(setDate);
  const handleVisibility = handleChange(setVisibility);
  const handleWeather = handleChange(setWeather);
  const handleComment = handleChange(setComment);

  const handleCreate = (event: React.SyntheticEvent) => {
    event.preventDefault();

    props.handleCreate({
      date,
      comment,
      visibility: visibility as Visibility,
      weather: weather as Weather,
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        date: <input type="text" value={date} onChange={handleDate} />
      </div>
      <div>
        visibility:{' '}
        <input type="text" value={visibility} onChange={handleVisibility} />
      </div>
      <div>
        weather: <input type="text" value={weather} onChange={handleWeather} />
      </div>
      <div>
        comment: <input type="text" value={comment} onChange={handleComment} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default NewDiaryForm;
