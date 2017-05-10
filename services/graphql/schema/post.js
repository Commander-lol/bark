const graphql = require('graphql')
const { type: user } = require('./user')
const { Date } = require('./types')

const PostRepo = local('database/repositories/post')
const Query = local('database/Query')

// Define the User type
const postType = exports.type = new graphql.GraphQLObjectType({
	name: 'Post',
	description: 'The Post type represents a blog post',
	fields: {
		title: { type: graphql.GraphQLString, description: 'Title of the Post' },
		slug: { type: graphql.GraphQLString, description: 'The url slug that identifies this post' },
		excerpt: { type: graphql.GraphQLString, description: 'A short preview of the blog post, suitable for listings' },
		content: { type: graphql.GraphQLString, description: 'Full content of the blog post' },
		author_id: { type: graphql.GraphQLInt, description: 'The numeric user ID of the post author' },
		author: { type: user, description: 'Public user data about the author of the post' },
		created_at: { type: Date, description: 'UTC datetime representing when the post was created. Not necessarily the same as when the post was published' },
	}
});

exports.post = {
	type: postType,
	args: {
		slug: { type: graphql.GraphQLString, description: 'The url slug that identifies the post' },
	},
	resolve: async function(_, { slug }) {
		return await PostRepo.findById(slug)
	},
}

exports.posts = {
	type: new graphql.GraphQLList(postType),
	args: {
		createdBefore: { type: Date, description: 'Filter out posts that were created after this UTC datetime' },
		createdAfter: { type: Date, description: 'Filter out posts that were created before this UTC datetime' },
		author: { type: graphql.GraphQLInt, description: 'The numeric identifier for the Author of the post' },
	},
	resolve: async function(_, { createdBefore, createdAfter }) {
		const query = new Query()

		if (createdBefore) query.before('created_at', createdBefore)
		if (createdAfter) query.after('created_at', createdAfter)

		return await PostRepo.find(query)
	}
}
