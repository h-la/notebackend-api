const { gql } = require("apollo-server");

const typeDefs = gql`
    type Note {
      title: String!
      text: String
      url: String
      important: Boolean
      id: ID!
    }
  
    extend type Query {
        notesCount: Int!
        allNotes: [Note!]!
        findNote(title: String!): Note
    }
  `

module.exports = typeDefs;