require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const schema = require('./src/graphql/schema');

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})