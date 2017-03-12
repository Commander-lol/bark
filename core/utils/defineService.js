const chalk = require('chalk')

module.exports = function(target, interfaze, get) {
	Object.defineProperty(target, 'exports', {
		configurable: false,
		enumerable: true,
		get() {
			let service = null
			try {
				service = get()
			} catch (e) {
				if (interfaze.name === 'LoggerInterface') {
					console.error('Failed to get logger implementation')
					console.trace()
				} else {
					if (e.message.startsWith('Cannot find module')) {
						console.error(chalk.red(`Failed to load .env specified implementation for ${interfaze.name}`))
						console.trace()
					} else {
						throw e
					}
				}
			}
			if (! service instanceof interfaze) {
				throw new TypeError(`Service doesn't implement interface ${interfaze.name}`)
			}
			return service
		}
	})
}
