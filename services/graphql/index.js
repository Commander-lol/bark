const graphqlHTTP = require('koa-graphql')
const schema = require('./schema')

module.exports = graphqlHTTP({
	schema,
	graphiql: true,
})
