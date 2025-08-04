export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export interface Diary {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type DiaryWithoutComment = Omit<Diary, 'comment'>;
export type NewDiary = Omit<Diary, 'id'>;
