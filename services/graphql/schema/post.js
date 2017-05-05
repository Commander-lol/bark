const graphql = require('graphql')
const { type: user } = require('./user')

const PostRepo = local('database/repositories/post')

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
	resolve: async function() {
		return await PostRepo.all()
	}
}
