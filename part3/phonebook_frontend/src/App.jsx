import { useState, useEffect } from 'react';
import personsServices from './services/personsServices';

import Filter from './components/filter/Filter';
import Persons from './components/persons/Persons';
import PersonForm from './components/personForm/PersonForm';
import Notification from './components/notification/notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
  const findPerson = (persons, name) => 
    persons.find(person =>  
      person.name.toLowerCase() === name.toLowerCase());

  // Handling error message
  const errMsgTemplate = (target) => 
    `Information of ${target}.name} has already been removed from server`;

  const errorMessageHandler = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  // Handling success message
  const successMessageHandler = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const getValidationError = (message, string) => 
    message.slice(message.indexOf(string) + string.length);

  // Create a new person and update setPersons (API)
  const createNewPersonAPI = (newPerson) => 
    personsServices
      .create(newPerson)
      .then(createdPerson => { 
        setPersons(persons.concat(createdPerson));
        
        // sending a success message
        successMessageHandler(`Added ${createdPerson.name}`);
      })
      .catch(error => {
        const rawError = error.response.data.error;
        console.log(rawError);

        let msg = '';
        if (rawError.includes('name: ')) {
          msg = getValidationError(rawError, 'name: ');
        } else if (rawError.includes('number: ')) {
          msg = getValidationError(rawError, 'number: ');
        }

        console.log(msg);
        errorMessageHandler(msg);
      });

  // Update person and update setPersons (API)
  const updatePersonsAPI = (target) =>
    personsServices
      .update(target.id, target)
      .then(updated => {
        const updatedPersons = 
          persons.map(person => 
            person.id === updated.id ? updated : person);
        setPersons(updatedPersons);

        // sending a succes message
        successMessageHandler(`Updated ${updated.name}`);
      })
      .catch(err => {
        // Sending error message
        errorMessageHandler(err.response.data.error);
        setPersons(persons.filter(p => p.id !== target.id));
      });

  // Removing person and update setPersons (API)
  const removedPersonAPI = (target) =>  
    personsServices
      .remove(target.id)
      .then(removed => {
        const filterer = person => person.id !== target.id;
        setPersons(persons.filter(filterer));

        // Sending success message
        successMessageHandler(`Removed ${removed.name}`);
      })
      .catch(err => {
        // Sending error message
        errorMessageHandler(err.response.data.error); 
      });

  //// Handler functions

  // Add a new person  
  const addPersonHandler = (event) => {
    event.preventDefault();
    const person = findPerson(persons, newName);

    if (person === undefined) {
    // POST: Adding a new person to server
    const newPerson = { name: newName, number: newNumber };
    createNewPersonAPI(newPerson);
    } else {
      // Person is already existed
      const confirmation = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      // Update number if user agrees to change 
      if (confirmation) {
        // PUT: updating person's number
        const updatedPerson = { ...person, number: newNumber };
        updatePersonsAPI(updatedPerson);
      }
    }

    // Reset values
    setNewName('');
    setNewNumber('');
  };

  // Delete person
  const removePersonHandler = (id) => {
    // finding person for confirmation
    const target = persons.find(person => person.id === id);
    const confirmation = window.confirm(`Delete ${target.name}`);

    if (!confirmation) {
      return;
    }

    // DELETE: removing person from database
    removedPersonAPI(target);
  };

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        className={successMessage ? 'succes' : 'error'}
        message={successMessage || errorMessage}
      />
      <Filter persons={persons} />
      <h2>Add a new</h2>
      <PersonForm 
        onAddPerson={addPersonHandler}
        onNewName={handleNewName}
        onNewNumber={handleNewNumber}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        onRemovePerson={removePersonHandler} 
      />

    </div>
  );
};

export default App;