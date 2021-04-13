const { v1: uuid } = require('uuid')
const { UserInputError } = require('apollo-server')

let notes = [
    {
        title: "Hae ruoka",
        text: "osta omenoita ja kahvia",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        title: "Hyvä blogikirjoitus",
        text: "Käsittelee ohjelmointia",
        url: "www.jokuosoite.com",
        important: true,
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        title: "Vie roskat",
        important: false,
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

module.exports = {
    Query: {
        notesCount: () => notes.length,
        allNotes: () => notes,
        findNote: (root, args) =>
            notes.find(n => n.title === args.title)
    },
    Mutation: {
        addNote: (root, args) => {
        /*    if (notes.find(n => n.title === args.title)) {
                throw new UserInputError('Title must be unique', {
                    invalidArgs: args.title,
                })
            } */
            const note = { ...args, id: uuid() }
            notes = notes.concat(note)
            return note
        },

        editNote: (root, args) => {
            const note = notes.find(n => n.id === args.id)
            if (!note) {
                return null
            }

            const updatedNote = {
                ...note,
                title: args.title || note.title,
                text: args.text || note.text,
                url: args.url || note.url,
                important: args.important || false
            }

            notes = notes.map(n => n.id === args.id ? updatedNote : n)
            return updatedNote
        },

        deleteNote:(root, args) => {
            const note = notes.find(n => n.id === args.id)
            if (!note) {
                return false
            }
            notes = notes.filter(n => n.id !== args.id)
            return true
        }

    }
}
