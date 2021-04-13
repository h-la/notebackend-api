const { v1: uuid } = require('uuid')
const { UserInputError } = require('apollo-server')
const Note = require('../../models/note.js')

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
        notesCount: () => Note.collection.countDocuments(),
        allNotes: () => {
            return Note.find({})
        },
        findNote: (root, args) => Note.findOne({ title: args.title })
    },
    Mutation: {
        addNote: (root, args) => {
            const note = new Note({ ...args })
            return note.save()
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
            return note.save()
        },
        deleteNote: (root, args) => {
            return Note.deleteOne({ _id: args.id })
        }
    }
}
