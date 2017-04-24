const { logger } = service
const chalk = require('chalk')

function colorStatus(status) {
	if (status < 300) {
		return chalk.bgGreen.white(` ${status} `)
	} else if (status < 400) {
		return chalk.bgBlue.white(` ${status} `)
	} else if (status < 600) {
		return chalk.bgRed.white(` ${status} `)
	} else {
		return chalk.bgOrange.white(` ${status} `)
	}
}

module.exports = async function(ctx, next) {
	const start = Date.now()
	await next()
	const time = Date.now() - start
	logger.info(colorStatus(ctx.status), ctx.method, ctx.path, ctx.request.header['user-agent'], `${time}ms`)
}
