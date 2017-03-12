const { logger } = service
exports.hello = async ctx => {
	logger.debug(ctx.request)
	ctx.body = { message: 'hello' }
}
