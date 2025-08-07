import type { NewDiary } from './types';

export interface NewDiaryFormProps {
  handleCreate: (newDiary: NewDiary) => void;
}
