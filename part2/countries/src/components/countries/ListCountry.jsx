import { useState } from 'react';
import ShowCountry from './ShowCountry';

const ListCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <li>
      {`${country.name.common} `}
      <button onClick={() => setShow(!show)}>
        {!show ? 'Show' : 'Hide'}
      </button>
      <br />
      <ShowCountry show={show} country={country} /> 
    </li>
  ); 
};

export default ListCountry;