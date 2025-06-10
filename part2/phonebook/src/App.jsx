import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '00-44-908765'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </div>
  );
};

export default App;