import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const Save_Book = gql`
  mutation saveBook($id: ID!) {
    saveBook(bookId: $id) {
      _id
      username
      books {
        _id
        username
      }
    }
  }
`;

export const REMOVE_Book = gql`
  mutation removeBook($id: ID!) {
    removeBook(bookid: $id) {
      _id
      username
      books {
        _id
        username
      }
    }
  }
`;