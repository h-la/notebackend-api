const { UserInputError, AuthenticationError } = require('apollo-server')
const Note = require('../../models/note.js')

module.exports = {
  Query: {
    notesCount: () => Note.collection.countDocuments(),
    allNotes: (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      return Note.find({ user: currentUser._id })
      //return Note.find({})
    },
    findNote: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      //  const note = await Note.findOne({ _id: args.id })
      //  if (String(note.user) === String(currentUser._id)) {
      //    return note
      //  }
      return Note.findOne({ _id: args.id })
    }
  },
  Mutation: {
    addNote: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let important = args.important
      console.log(args.important)
      if (args.important == null) {
        important = false
      }

      // const date = new Date()

      const note = new Note({
        title: args.title,
        text: args.text,
        url: args.url,
        important: important,
        dateCreated: new Date(),
        dateModified: new Date(),
        user: currentUser._id
      })

      try {
        const newNote = await note.save()
        return newNote
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      //  return newNote
    },
    editNote: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const note = await Note.findOne({ _id: args.id })

      //  if (String(note.user) !== String(currentUser._id)) {
      //    return null
      //  }

      let important = args.important
      if (args.important == null) {
        important = note.important
      }

      note.title = args.title || note.title
      note.text = args.text || note.text
      note.url = args.url || note.url
      note.important = important
      note.dateModified = new Date()

      try {
        const newNote = await note.save()
        return newNote
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      //   return note
    },
    deleteNote: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      //  const ownNote = await Note.findOne({ _id: args.id })
      //  if (String(ownNote.user) !== String(currentUser._id)) {
      //    return null
      //  }

      try {
        const note = await Note.deleteOne({ _id: args.id })
        //  const note = await Note.deleteOne({ _id: args.id })
        //  if (note.deletedCount === 1) {
        //    return true
        //  }
        return note
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      //  return null
    }
  }
}
