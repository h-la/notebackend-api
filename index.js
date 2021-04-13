const { ApolloServer } = require('apollo-server')
const schema = require('./src/graphql/schema');

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})