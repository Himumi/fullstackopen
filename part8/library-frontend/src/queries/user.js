import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
