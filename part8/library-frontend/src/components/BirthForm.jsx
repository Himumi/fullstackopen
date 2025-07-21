import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from "../queries/authors";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [changeBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const setValue =
    (f) =>
    ({ target }) =>
      f.call(null, target.value);
  const handleName = setValue(setName);
  const handleBorn = setValue(setBorn);

  const resetNameAndBorn = () => {
    setName("");
    setBorn("");
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    changeBirth({
      variables: { name, setBornTo: Number(born) },
    });

    resetNameAndBorn();
  };

  const handleSelect = (author) => {
    return () => {
      setBorn(author.born ? author.born.toString() : "");
      setName(author.name);
    };
  };

  const selectStyles = {
    width: "20%",
    padding: 5,
    paddingLeft: 10,
    fontSize: "0.7em",
    color: "gray",
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <select style={selectStyles}>
        <option onClick={() => resetNameAndBorn()}>select author</option>
        {result.data.allAuthors.map((author) => (
          <option
            key={author.name}
            value={author.name}
            onClick={handleSelect(author)}
          >
            {author.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleUpdate}>
        <div>
          name
          <input value={name} onChange={handleName} />
        </div>
        <div>
          born
          <input value={born} onChange={handleBorn} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
