import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/diaries';

import type { DiaryWithoutComment } from '../types';

const getDiaries = async () => {
  const response = await axios.get<DiaryWithoutComment[]>(baseUrl);
  return response.data;
};

export default {
  getDiaries,
};
