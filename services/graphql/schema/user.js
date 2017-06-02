const graphql = require('graphql')

const UserRepo = local('database/repositories/user')

// Define the User type
const userType = exports.type = new graphql.GraphQLObjectType({
	name: 'User',
	description: 'The User type represents a user in the system. This can be an author, a commenter or a person with hybrid permissions',
	fields: {
		id: { type: graphql.GraphQLString, description: 'The unique numeric identifier for the User' },
		email: { type: graphql.GraphQLString, description: 'The contact email address used to validate this user account' },
	}
});

exports.user = {
	type: userType,
	args: {
		id: { type: graphql.GraphQLString },
	},
	resolve: async function(_, { id }) {
		return await UserRepo.findById(id)
	},
}

exports.users = {
	type: new graphql.GraphQLList(userType),
	resolve: async function() {
		return await UserRepo.all()
	}
}
