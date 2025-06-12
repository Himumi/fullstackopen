const Person = ({ person, onRemovePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={onRemovePerson}>delete</button>
    </li>
  );
};

export default Person;