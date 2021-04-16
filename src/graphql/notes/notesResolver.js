const { UserInputError } = require('apollo-server')
const Note = require('../../models/note.js')

module.exports = {
    Query: {
        notesCount: () => Note.collection.countDocuments(),
        allNotes: () => {
            return Note.find({})
        },
        findNote: (root, args) => Note.findOne({ _id: args.id })
    },
    Mutation: {
        addNote: async (root, args) => {
            const note = new Note({ ...args })

            try {
                await note.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return note
        },
        editNote: async (root, args) => {
            let important = args.important
            const note = await Note.findOne({ _id: args.id })
            if (args.important == null) {
                important = note.important
            }

            note.title = args.title || note.title
            note.text = args.text || note.text
            note.url = args.url || note.url
            note.important = important

            try {
                await note.save()
              } catch (error) {
                throw new UserInputError(error.message, {
                  invalidArgs: args,
                })
              }

            return note
        },
        deleteNote: async (root, args) => {
            try {
                note = await Note.deleteOne({ _id: args.id })
              } catch (error) {
                throw new UserInputError(error.message, {
                  invalidArgs: args,
                })
              }

            return note
        }
    }
}
