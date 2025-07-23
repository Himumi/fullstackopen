import { useLazyQuery, useQuery } from '@apollo/client';
import { USER_FAVORITE_GENRE } from '../queries/user';
import { ALL_BOOKS } from '../queries/books';
import { useState } from 'react';
import BooksTable from './BooksTable';

const RecommendedBooks = () => {
  const [genre, setGenre] = useState(null);
  const user = useQuery(USER_FAVORITE_GENRE, {
    onCompleted: (data) => {
      setGenre(data.me.favoriteGenre);
    },
  });
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre,
    },
  });

  if (user.loading || books.loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre {user.data.me.favoriteGenre}</div>
      {books.data && <BooksTable books={books.data.allBooks} />}
      {!books.data && <div>no match books</div>}
    </div>
  );
};

export default RecommendedBooks;
