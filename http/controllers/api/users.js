const UserRepo = local('database/repositories/user')
const Query = local('database/Query')
const rules = local('core/validator/rules')
const Validator = require('@commander-lol/validate')

exports.index = async ctx => {
	const query = new Query()
	const users = await UserRepo.find(query)
	ctx.body = { users }
}

exports.one = async ctx => {
	ctx.body = { user: ctx.params.user }
}

const validateNewUser = Validator({
	email: [
		rules.exists('email'),
		rules.isString('email'),
		rules.notEmpty('email'),
	],
	password: [
		rules.exists('password'),
		rules.isString('password'),
		password => password.length > 6 ? null : 'password must be at least 6 characters long'
	]
})

exports.create = async ctx => {
	const { body } = ctx.request
	const errors = validateNewUser(body)
	if (errors) {
		ctx.status = 400
		ctx.body = errors
	} else {
		const val = await UserRepo.create(body)
		console.log(val)
		ctx.body = { result: val }
	}
}
