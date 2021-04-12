const { makeExecutableSchema, gql } = require("apollo-server");

const booksTypeDefs = require('./queries/books/booksTypeDefs')
const booksResolver = require('./queries/books/booksResolver');
const notesTypeDefs = require('./queries/notes/notesTypeDefs')
const notesResolver = require('./queries/notes/notesResolver');

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
  `

const typeDefs = [
    rootTypeDefs,
    booksTypeDefs,
    notesTypeDefs
]

const resolvers = [
    notesResolver,
    booksResolver
]

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;