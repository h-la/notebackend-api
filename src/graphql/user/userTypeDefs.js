const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        username: String!
        passwordHash: String!
        id: ID!
    }

    type Token {
      value: String!
    }

    extend type Query {
      me: User
    }

    extend type Mutation {
      createUser(
        username: String!
        password: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    }

`

module.exports = typeDefs;