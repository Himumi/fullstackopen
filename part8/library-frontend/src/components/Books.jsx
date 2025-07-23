import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GET_GENRES } from '../queries/books';
import { useState } from 'react';

const Books = () => {
  const [genre, setGenre] = useState(null);
  const genres = useQuery(GET_GENRES);
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre,
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const handleFilterByGenre = (genre) => () => setGenre(genre);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.data.getGenres.map((genre) => (
          <button key={genre} onClick={handleFilterByGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={handleFilterByGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
