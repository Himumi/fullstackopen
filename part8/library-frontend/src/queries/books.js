import { gql } from "@apollo/client";

export const ALL_BOOKS_WITHOUT_GENRE = gql`
  query allBooksWithoutGenre($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author
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
      author
      published
    }
  }
`;
