const { makeExecutableSchema, gql } = require("apollo-server");

const booksTypeDefs = require('./books/booksTypeDefs')
const booksResolver = require('./books/booksResolver');
const notesTypeDefs = require('./notes/notesTypeDefs')
const notesResolver = require('./notes/notesResolver');

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