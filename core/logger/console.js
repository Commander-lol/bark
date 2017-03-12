const Interface = require('./Interface')
const chalk = require('chalk')

const mapping = {
	debug: 0,
	info: 1,
	warning: 2,
	error: 3,
	critical: 4,
}

const convert = level => mapping[level.toLowerCase()] || -1

const level = () => env('LOG_LEVEL', 'info')

const levelProperties = {
	debug: {
		get predicate() { return env('NODE_ENV', 'development') === 'development' },
		prefix: chalk.bgGreen.white(' DEBUG '),
		action: null,
	},
	info: {
		get predicate() { return convert(level()) <= mapping.info },
		prefix: chalk.bgCyan.black(' INFO '),
		action: null,
	},
	warning: {
		get predicate() { return convert(level()) <= mapping.warning },
		prefix: chalk.bgYellow.black(' WARNING '),
		action: null,
	},
	error: {
		get predicate() { return convert(level()) <= mapping.error },
		prefix: chalk.bgRed.white(' ERROR '),
		action: null,
	},
	critical: {
		predicate: true,
		prefix: chalk.bgMagenta.black(' ‼ CRITICAL ‼ '),
		action: (...message) => {
			/// Dispatch email async
		},
	},
}

class ConsoleLogger extends Interface {
	static get ConsoleLogger() { return ConsoleLogger }

	log(level, ...message) {
		const handler = levelProperties[level]
		if (handler.predicate) {
			console.log(handler.prefix, ...message)
			if (handler.action) {
				handler.action(...message)
			}
		}
	}
}

module.exports = new ConsoleLogger()
