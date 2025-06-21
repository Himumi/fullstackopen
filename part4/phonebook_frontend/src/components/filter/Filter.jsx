import { useState } from 'react';

const Filter = ({ persons }) => {
  const [filteredPersons, setFilteredPersons] = useState([]);

  // Filtering persons based on target
  const filterPersons = (persons, target) => {
    const filterer = person => 
      person.name.toLowerCase().includes(target.toLowerCase());

    return target === '' ? [] : persons.filter(filterer);
  };

  const handleFilterName = (event) => {
    const target = event.target.value;
    const filtered = filterPersons(persons, target);
    
    setFilteredPersons(filtered);
  };

  return (
    <div>
      <p>
        filter shown with 
        <input onChange={handleFilterName} />
      </p>
      {filteredPersons.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </div>
  );
};

export default Filter;