const { HttpError } = require('../utils')
exports.restrictToGroup = groups => async (ctx, next) => {
	const only = Array.isArray(groups) ? groups : [groups]
	if (!ctx.user) {
		ctx.response.set('WWW-Authenticate', 'Bearer')
		throw new HttpError(401, 'You are not permitted to access this resource')
	}else if (only.includes(ctx.user.group)) {
		await next(ctx)
	} else {
		throw new HttpError(403, 'You are not permitted to access this resource')
	}
}
