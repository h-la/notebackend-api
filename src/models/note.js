const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    url: {
        type: String,
    },
    important: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

module.exports = mongoose.model('Note', schema)