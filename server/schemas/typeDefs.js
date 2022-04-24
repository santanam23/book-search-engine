const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }


  type Query {
    me: User
  }
  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(updatedUser: String!): Book
    removeBook(bookId: ID!, updatedUser: String!): Book
  }  

  type User {
    users: [User]
    user(username: String!): User
  }
`;

module.exports = typeDefs;