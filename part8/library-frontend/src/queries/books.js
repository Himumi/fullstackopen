import { gql } from "@apollo/client";

export const ALL_BOOKS_WITHOUT_GENRE = gql`
  query allBooksWithoutGenre (
    $author: String
    $genre: String
  ) {
    allBooks (
      author: $author
      genre: $genre
    ) {
      title
      published
      author
    }
  }
`