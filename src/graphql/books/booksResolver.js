const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('../../models/book.js')

module.exports = {
    Query: {
        bookCount: () => Note.collection.countDocuments(),
        allBooks: (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            // sort condition
            condition = { dateModified: -1 }

            if (args.order) {
                condition = args.order
                console.log(condition.dateModified)
                if (condition.dateModified == 'asc') {
                    condition.dateModified = 1
                } else if (condition.dateModified == 'desc') {
                    condition.dateModified = -1
                }
            }

            if (condition.important == 'asc' || condition.important == 'desc') {
                return Book.find({ user: currentUser._id })
                    .sort(condition)
                    .sort({ dateModified: -1 })
            }

            return Book.find({ user: currentUser._id })
                .sort(condition)
        },
        // args sisältää kyselyn parametrit
        findBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            return Book.findOne({ _id: args.id })
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            let important = args.important
            console.log(args.important)
            if (args.important == null) {
                important = false
            }

            const book = new Book({
                name: args.name,
                author: args.author,
                genre: args.genre,
                description: args.description,
                important: important,
                dateCreated: new Date(),
                dateModified: new Date(),
                user: currentUser._id
            })

            try {
                const newBook = await book.save()
                return newBook
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }
      
            const book = await Book.findOne({ _id: args.id })
      
            let important = args.important
            if (args.important == null) {
              important = book.important
            }
      
            book.name = args.name || book.name
            book.author = args.author || book.author
            book.genre = args.genre || book.genre
            book.description = args.description || book.description
            book.important = important
            book.dateModified = new Date()
      
            try {
              const newBook = await book.save()
              return newBook
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
          },
        deleteBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                const book = await Book.deleteOne({ _id: args.id })
                return book
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        }
    }
}

