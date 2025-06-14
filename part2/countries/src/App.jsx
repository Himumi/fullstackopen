import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/countries/Countries';

// Filter countries based on query
const filterCountries = (countries, query) => {
  const handler = (country => {
    const countryName = country.name.common.toLowerCase();
    const target = query.toLowerCase();
    return countryName.includes(target);
  });
  return countries.filter(handler);
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  const allCountriesAPI = 'https://studies.cs.helsinki.fi/restcountries/api/all';

  // Hooker for fetching all countries
  const countriesHooker = () => {
    console.log('countries hook');

    axios
      .get(allCountriesAPI)
      .then(Response => { 
        setAllCountries(Response.data);
      });
  };
  
  // useEffect
  useEffect(countriesHooker, []);

  const  handleSearch = (event) => {
    const target = event.target.value;

    if (target === '') {
      setCountries([]);
    } else {
      setCountries(filterCountries(allCountries, target));
    }

    setQuery(target);
  };

  return (
    <div>
      <div>
        find countries: <input value={query} onChange={handleSearch} />
      </div>
      <Countries countries={countries} />
    </div>
  );
};

export default App;
