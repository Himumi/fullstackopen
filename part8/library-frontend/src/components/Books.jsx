import { useQuery } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries/books';
import { useState } from 'react';
import BooksTable from './BooksTable';
import GenreButtons from './GenreButtons';

import { useSubscription } from '@apollo/client';

const Books = ({ handleNotify }) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      handleNotify(`${addedBook.title} added`);

      client.cache.modify({
        fields: {
          allBooks(prevAllBooks = []) {
            const allBooks = new Set([...prevAllBooks, addedBook]);
            return [...allBooks];
          },
        },
      });
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
