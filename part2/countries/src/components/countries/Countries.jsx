import Country from './Country';

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return countries.map(country => 
    <li key={country.name.common}>{country.name.common}</li>
  );
};

export default Countries;