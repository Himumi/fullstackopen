import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  // Checking if a new person is already exist in persons
  const isExisted = (persons, newName) => {
    return persons.some(person => person.name === newName);
  }; 

  // Add a new person  
  const addPerson = (event) => {
    event.preventDefault();

    // Prevent user to add exited person
    if (isExisted(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }

    // Reset values
    setNewName('');
    setNewNumber('');
  };

  // Handle functions
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  
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
      <h2>Phonebook</h2>
      <p>
        filter shown with 
        <input onChange={handleFilterName} />
      </p>
      {filteredPersons.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </div>
  );
};

export default App;