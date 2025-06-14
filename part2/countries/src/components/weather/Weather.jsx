import { useEffect, useState } from 'react'; 
import axios from 'axios';

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  // Hooker for weather API
  const weatherHooker = () => {
    
    console.log('fetching weather');

    // fetching weather data from API
    axios
      .get(baseUrl)
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
      });
  };

  // useEffect
  useEffect(weatherHooker, [baseUrl])

  // Prevent component to render before gettting response from API
  if (weather.length < 1) return null;

  return (
    <div>
      <h1>Weather in {country.capital[0]}</h1>
      <p>Temperature {kelvinToCelsius(weather.main.temp).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;