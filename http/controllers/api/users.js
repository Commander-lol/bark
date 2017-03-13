const UserRepo = local('database/repositories/user')
const Query = local('database/Query')
const rules = local('core/validator/rules')
const Validator = require('@commander-lol/validate')

exports.index = async ctx => {
	const query = new Query()
	const users = await UserRepo.find(query)
	ctx.body = { users }
}

const validateNewUser = Validator({
	email: [
		rules.exists('email'),
		rules.isString('email'),
		rules.notEmpty('email'),
	],
})

exports.create = async ctx => {
	const { body } = ctx.request
	const errors = validateNewUser(body)
	if (errors) {
		ctx.status = 400
		ctx.body = errors
	} else {
		console.log("Valid user")
	}
}
