const { gql } = require("apollo-server");

const typeDefs = gql`
    scalar Date

    type Note {
      title: String
      text: String
      url: String
      important: Boolean
      id: ID!
      dateCreated: Date
      dateModified: Date
      user: ID
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
        dateCreated: Date
        dateModified: Date
        user: ID
      ): Note
      editNote(
        id: ID!
        title: String
        text: String
        url: String
        important: Boolean
        dateModified: Date
      ): Note
      deleteNote(
        id: ID!
      ): Note
    }

  `

module.exports = typeDefs;