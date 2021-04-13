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
    }
})

module.exports = mongoose.model('Note', schema)