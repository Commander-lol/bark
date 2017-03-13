exports.subdomains = map => async (ctx, next) => {
	const domain = ctx.subdomains.join('.')
	if (domain in map) {
		await map[domain].routes()(ctx, next)
	} else {
		await next()
	}
}
