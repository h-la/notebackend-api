const { gql } = require("apollo-server");

const typeDefs = gql`
    type Note {
      title: String
      text: String
      url: String
      important: Boolean
      id: ID!
    }
  
    extend type Query {
        notesCount: Int!
        allNotes: [Note!]!
        findNote(id: ID!): Note
    }

    extend type Mutation {
      addNote(
        title: String
        text: String
        url: String
        important: Boolean
      ): Note
      editNote(
        id: ID!
        title: String
        text: String
        url: String
        important: Boolean
      ): Note
      deleteNote(
        id: ID!
      ): Note
    }

  `

module.exports = typeDefs;