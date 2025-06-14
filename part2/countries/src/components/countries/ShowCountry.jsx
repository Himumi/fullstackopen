import Country from './Country';

const ShowCountry = ({ show, country }) => {
  if (!show) return;

  return <Country country={country} />
};

export default ShowCountry;