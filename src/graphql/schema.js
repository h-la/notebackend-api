const { makeExecutableSchema, gql } = require("apollo-server");

const userTypeDefs = require('./user/userTypeDefs')
const userResolver = require('./user/userResolver');
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
  userTypeDefs,
  booksTypeDefs,
  notesTypeDefs
]

const resolvers = [
  userResolver,
  notesResolver,
  booksResolver
]

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;