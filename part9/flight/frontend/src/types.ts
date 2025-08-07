export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'Ok',
  Poor = 'poor',
}

export interface Diary {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type DiaryWithoutComment = Omit<Diary, 'comment'>;
export type NewDiary = Omit<Diary, 'id'>;

export type StringState = React.Dispatch<React.SetStateAction<string>>;
export type InputEventChange = React.ChangeEvent<HTMLInputElement>;
export type SelectEventChange = React.ChangeEvent<HTMLSelectElement>;
