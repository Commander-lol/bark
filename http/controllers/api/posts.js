const BlogRepo = local('database/repositories/post')
const Query = local('database/Query')
const rules = local('core/validator/rules')
const Validator = require('@commander-lol/validate')
const serialise = require('../../serialisers/post')

exports.index = async ctx => {
	const query = new Query()
	const posts = await BlogRepo.find(query)
	console.log(posts)
	ctx.body = { posts: posts.map(serialise) }
}

exports.one = async ctx => {
	ctx.body = { post: serialise(ctx.params.post) }
}

const validateNewPost = Validator({
	title: [ rules.exists('title'), rules.isString('title') ],
	slug: [ rules.exists('slug'), rules.isString('slug') ],
	content: [ rules.exists('content'), rules.isString('content') ],
	draft: [ rules.notEmpty('draft'), rules.isBool('draft') ],
})

exports.create = async ctx => {
	const { body } = ctx.request
	const errors = validateNewPost(body)
	if (errors) {
		ctx.status = 400
		ctx.body = errors
	} else {
		body.author_id = 1
		const val = await BlogRepo.create(body)
		console.log(val)
		ctx.body = { result: val }
	}
}
