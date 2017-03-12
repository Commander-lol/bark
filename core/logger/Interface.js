const assert = require('../utils/assertUnimplemented')
module.exports = class LoggerInterface {
	log(level, ...message) {
		assert('log')
	}
	debug(...message) {
		this.log('debug', ...message)
	}
	info(...message) {
		this.log('info', ...message)
	}
	warning(...message) {
		this.log('warning', ...message)
	}
	error(...message) {
		this.log('error', ...message)
	}
	critical(...message) {
		this.log('critical', ...message)
	}
}
