import Country from './Country';

const ShowCountry = ({ show, country }) => {
  if (!show) return;

  return (
    <div>
      <Country country={country} />
    </div>
  ); 
};

export default ShowCountry;