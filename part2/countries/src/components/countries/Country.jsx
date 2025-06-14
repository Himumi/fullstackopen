import Weather from '../weather/Weather';

const Country = ({ country }) => {
  const imgStyles = {
    border: '2px solid black',
    width: 250,
    height: 'auto'
  };

  return (
   <div>
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital} 
        <br />
        Area {country.area}
      </p>
    </div>
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => 
            <li key={lang}>{lang}</li>
          )}
      </ul>
    </div>
    <img src={country.flags.png} style={imgStyles} />
    <Weather country={country} />
   </div>
  );
};

export default Country;