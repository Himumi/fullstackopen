import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/diaries';

import type { Diary, DiaryWithoutComment, NewDiary } from '../types';

const getDiaries = async () => {
  const response = await axios.get<DiaryWithoutComment[]>(baseUrl);
  return response.data;
};

const createDiary = async (diary: NewDiary) => {
  const response = await axios.post<Diary>(baseUrl, diary);
  return response.data;
};

export default {
  getDiaries,
  createDiary,
};
