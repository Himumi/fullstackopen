import { useState } from 'react';

import { Visibility, Weather } from '../types';
import type {
  StringState,
  InputEventChange,
  SelectEventChange,
} from '../types';
import type { NewDiaryFormProps } from '../props';

type EventChange = InputEventChange | SelectEventChange;

// Components
import Select from './Select';

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleChange = (f: StringState) => {
    return (event: EventChange) => {
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
        <Select
          name="visibility"
          options={Object.values(Visibility)}
          handleChange={handleVisibility}
        />
      </div>
      <div>
        <Select
          name="weather"
          options={Object.values(Weather)}
          handleChange={handleWeather}
        />
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
