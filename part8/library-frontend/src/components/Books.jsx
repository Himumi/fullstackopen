import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GET_GENRES } from '../queries/books';
import { useState } from 'react';
import BooksTable from './BooksTable';
import GenreButtons from './GenreButtons';

const Books = () => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      <GenreButtons setGenre={setGenre} />
    </div>
  );
};

export default Books;
