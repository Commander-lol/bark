const graphql = require('graphql')

const UserRepo = local('database/repositories/user')

// Define the User type
const userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: graphql.GraphQLString },
		email: { type: graphql.GraphQLString },
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

exports.type = userType
