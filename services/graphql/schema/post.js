const graphql = require('graphql')
const { type: user } = require('./user')
const { Date } = require('./types')

const PostRepo = local('database/repositories/post')
const Query = local('database/Query')

// Define the User type
const postType = new graphql.GraphQLObjectType({
	name: 'Post',
	fields: {
		title: { type: graphql.GraphQLString },
		slug: { type: graphql.GraphQLString },
		excerpt: { type: graphql.GraphQLString },
		content: { type: graphql.GraphQLString },
		author_id: { type: graphql.GraphQLInt },
		author: { type: user },
		created_at: { type: Date },
	}
});

exports.post = {
	type: postType,
	args: {
		slug: { type: graphql.GraphQLString },
	},
	resolve: async function(_, { slug }) {
		return await PostRepo.findById(slug)
	},
}

exports.posts = {
	type: new graphql.GraphQLList(postType),
	args: {
		before: { type: Date },
		after: { type: Date },
	},
	resolve: async function(_, { before, after }) {
		const query = new Query()

		if (before) query.before('created_at', before)
		if (after) query.after('created_at', after)

		return await PostRepo.find(query)
	}
}
