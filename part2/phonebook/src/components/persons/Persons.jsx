import Person from './Person';

const Persons = ({ persons, onRemovePerson }) => {


  return (
    <div>
      {persons.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          onRemovePerson={() => onRemovePerson(person.id)}
        />
      )}
    </div>
  );
};

export default Persons;