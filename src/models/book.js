const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    description: {
        type: String,
    },
    important: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    dateCreated: {
        type: Date,
    },
    dateModified: {
        type: Date,
    }
})

module.exports = mongoose.model('Book', schema)