exports.subdomains = map => async (ctx, next) => {
	const domain = ctx.subdomains.join('.')
	if (domain in map) {
		await map[domain].routes()(ctx, next)
	} else {
		await next()
	}
}

exports.HttpError = class HttpError extends Error {
	constructor(status, message) {
		super(message)
		this.statusMessage = message
		this.statusCode = status
	}
}
