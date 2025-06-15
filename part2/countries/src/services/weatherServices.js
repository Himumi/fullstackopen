import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = (lat, lon) => 
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

const getWeatherOn = (lat, lon) => {
  const request = axios.get(baseUrl(lat, lon));
  return request.then(response => response.data);
};

export default { getWeatherOn };