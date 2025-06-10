import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const hasSameName = (persons, newName) => {
    return persons.some(person => person.name === newName);
  }; 

  const addName = (event) => {
    event.preventDefault();

    // Prevent user to add exited person
    if (hasSameName(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson))
    }

    setNewName('');
  };

  const handleNewName = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNewName} 
                />
        </div>
        <div>
          <button type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <li key={person.name}>{person.name}</li>
      )}
    </div>
  );
};

export default App;