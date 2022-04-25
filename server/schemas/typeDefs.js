const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: Book
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
    users: [User]
    user(username: String!): User
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
`;

module.exports = typeDefs;