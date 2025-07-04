import axios from 'axios';

const allCountriesAPI = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAllCountries = () => {
  const request = axios.get(allCountriesAPI);
  return request.then(response => response.data);
};

export default { getAllCountries };