const Templater = local('services/templates')
const posts = local('database/repositories/post')
const meta = local('database/repositories/meta')
const serialise = local('http/serialisers/post')

exports.index = async ctx => {
	const { page = 1, perPage = 5 } = ctx.query

	const nPage = Number(page)
	const nPerPage = Number(perPage)

	const renderer = await Templater.initFromTheme()

	const count = await meta.postCount()
	const query = posts.baseQuery().page(nPage, nPerPage)
	const entries = await posts.find(query)

	const hasNext = ((nPage - 1) * nPerPage) + entries.length < count
	const hasPrev = nPage !== 1

	ctx.type = 'text/html'
	ctx.body = await renderer.render('blog', Object.assign(
		{},
		{ posts: entries.map(serialise), count, page, perPage, hasNext, hasPrev },
		Templater.environmentPararms()
	))
}
