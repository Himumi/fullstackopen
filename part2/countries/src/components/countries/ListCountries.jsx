import ListCountry from './ListCountry';

const ListCountries = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => 
        <ListCountry key={country.name.common} country={country} /> 
      )}
    </div>
  );
};

export default ListCountries;