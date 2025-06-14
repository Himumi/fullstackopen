import { useEffect, useState } from 'react'; 
import weatherServices from '../../services/weatherServices';

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  // Get specific coordinate (latitude and longitude)
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  // Hooker for weather API
  const weatherHooker = () => {
    console.log('fetching weather');

    // fetching weather data from API
    weatherServices
      .getWeatherOn(lat, lon)
      .then(data => setWeather(data));    
  };

  // useEffect
  useEffect(weatherHooker, [lat, lon])

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