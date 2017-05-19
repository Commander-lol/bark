const mime = require('mime')
const theme = local('services/theme')

const jail = path => {
	let depth = 0
	const parts = path.split('/')
	return parts
		.map(part => {
			const bit = part.trim()
			if (bit === '..') {
				if (depth === 0) {
					return false
				} else {
					depth -= 1
					return bit
				}
			} else {
				depth += 1
				return bit
			}
		})
		.filter(part => !!part)
		.join('/')
}

module.exports = async (ctx, next) => {
	const path = await theme.getPath()
	const fs = jetpack.cwd(path).dir('public')
	const safeUrlPath = jail(ctx.path)
	const exists = await fs.existsAsync(safeUrlPath)
	if (exists === 'file') {
		ctx.type = mime.lookup(safeUrlPath)
		ctx.body = fs.createReadStream(safeUrlPath)
	} else {
		await next(ctx)
	}
}
