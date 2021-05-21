const { gql } = require("apollo-server");

const typeDefs = gql`
    type Book {
      name: String
      author: String
      description: String
      releaseYear: String
      id: ID!
    }
  
    extend type Query {
      bookCount: Int!
      allBooks: [Book!]!
      findBook(Book: String!): Book
    }
  `
  
module.exports = typeDefs;