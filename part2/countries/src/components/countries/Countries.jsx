import Country from './Country';
import ListCountries from './ListCountries';

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return <ListCountries countries={countries} />
};

export default Countries;