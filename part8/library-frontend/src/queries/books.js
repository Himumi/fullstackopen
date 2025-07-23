import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query allBooksWithoutGenre($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
    }
  }
`;

export const GET_GENRES = gql`
  query {
    getGenres
  }
`;
