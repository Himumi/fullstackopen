import { useState } from 'react';
import Filter from './components/filter/Filter';
import Persons from './components/persons/Persons';
import PersonForm from './components/personForm/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Checking if a new person is already exist in persons
  const isExisted = (persons, newName) =>
     persons.some(person => person.name === newName);

  // Add a new person  
  const addPerson = (event) => {
    event.preventDefault();

    // Prevent user to add exited person
    if (isExisted(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
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
      <Filter persons={persons} />
      <h2>Add a new</h2>
      <PersonForm 
        onAddPerson={addPerson}
        onNewName={handleNewName}
        onNewNumber={handleNewNumber}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;