import { useState } from 'react';

import type { Visibility, Weather } from '../types';
import type { NewDiaryFormProps } from '../props';

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleChange = (f: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        date: <input type="date" value={date} onChange={handleDate} />
      </div>
      <div>
        visibility:
        <select
          name="visibility"
          id="visibility-select"
          onChange={handleVisibility}
        >
          <option value="">--Please choose an option</option>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <div>
        weather:
        <select name="weather" id="weather-select" onChange={handleWeather}>
          <option value="">--Please choose an option</option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>
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
