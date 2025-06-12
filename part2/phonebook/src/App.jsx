import { useState, useEffect } from 'react';
import personsServices from './services/personsServices';

import Filter from './components/filter/Filter';
import Persons from './components/persons/Persons';
import PersonForm from './components/personForm/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Hooker
  const hook = () => {
    console.log('effect');
    
    // GET: Getting all persons (initialPersons) from server
    personsServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  };

  // Effect: fetching persons from server
  useEffect(hook, []);

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
      const newPerson = { name: newName, number: newNumber };
      
      // POST: Adding a new person to server
      personsServices
        .create(newPerson)
        .then(createdPerson => { 
          setPersons(persons.concat(createdPerson))
        });
    }

    // Reset values
    setNewName('');
    setNewNumber('');
  };

  // Delete person
  const removePerson = (id) => {
    // finding person for confirmation
    const person = persons.find(person => person.id === id);
    const confirmation = window.confirm(`Delete ${person.name}`);

    if (!confirmation) {
      return;
    }

    // DELETE: removing person from database
    personsServices
      .remove(id)
      .then(removed => {
        const filterer = person => person.id !== removed.id;
        setPersons(persons.filter(filterer));
      });
  };

  // Handler functions
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
      <Persons 
        persons={persons}
        onRemovePerson={removePerson} 
      />
    </div>
  );
};

export default App;