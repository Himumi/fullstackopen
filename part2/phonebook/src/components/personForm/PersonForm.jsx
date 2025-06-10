const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onAddPerson}>
        <div>
          name: <input value={props.nameValue} onChange={props.onNewName} />
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.onNewNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;