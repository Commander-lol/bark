const { HttpError } = require('../../utils')

const defaultMessageMap = {
	400: 'Bad Request',
	404: 'Page Not Found',
	500: 'Internal Server Error',
}

function messageFrom(error) {
	if (error.statusMessage) return error.statusMessage
	return defaultMessageMap[error.statusCode]
}

module.exports = async (ctx, next) => {
	try {
		await next(ctx)
	} catch (e) {
		if (e instanceof HttpError) {
			ctx.status = e.statusCode
			ctx.body = {
				code: e.statusCode,
				message: messageFrom(e),
			}
		} else {
			service.logger.error(e)
			ctx.status = 500
			ctx.body = {
				code: 500,
				message: env('APP_ENV', 'development') === 'development' ? e.message : defaultMessageMap[500],
			}
		}
	}
}
