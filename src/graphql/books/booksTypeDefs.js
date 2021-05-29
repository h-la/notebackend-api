const { gql } = require("apollo-server");

const typeDefs = gql`
    input BookOrderByInput {
      dateModified: Sort
      important: Sort
    }
        
    type Book {
      name: String
      author: String
      genre: String
      description: String
      important: Boolean
      id: ID!
      dateCreated: Date
      dateModified: Date
      user: ID
    }
  
    extend type Query {
      bookCount: Int!
      allBooks(order: BookOrderByInput): [Book!]!
      findBook(id: ID!): Book
    }

    extend type Mutation {
      addBook(
        name: String
        author: String
        genre: String
        description: String
        important: Boolean
        dateCreated: Date
        dateModified: Date
        user: ID
      ): Book
      editBook(
        id: ID!
        name: String
        author: String
        genre: String
        description: String
        important: Boolean
        dateModified: Date
      ): Book
      deleteBook(
        id: ID!
      ): Book   
    }
  `

module.exports = typeDefs;