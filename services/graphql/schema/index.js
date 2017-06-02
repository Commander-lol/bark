const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')

const { user, users } = require('./user')
const { post, posts } = require('./post')

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			user,
			users,
			post,
			posts,
		},
	}),
})
