const graphql = require('graphql')
const moment = require('moment')

exports.Date = new graphql.GraphQLScalarType({
	name: 'Date',
	serialize(value) {
		return moment.utc(value).toISOString()
	},
	parseValue(value) {
		return moment.utc(value).toISOString()
	},
	parseLiteral(ast) {
		if (ast.kind === graphql.Kind.STRING) {
			return moment.utc(ast.value).toISOString()
		}
		return null
	}
})
