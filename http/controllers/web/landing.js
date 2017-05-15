const Templater = local('services/templates')
const theme = local('services/theme')

exports.index = async ctx => {
	const props = await Promise.all([
		theme.getPath(),
		theme.getThemeParams(),
	])

	const renderer = new Templater(...props)

	await renderer.init()

	const val = await renderer.render('blog', {})

	console.log(val)

	ctx.body = val
}
