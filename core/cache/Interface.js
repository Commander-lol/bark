const assert = require('../utils/assertUnimplemented')
module.exports = class CacheInterface {
	async remember(key, fn) {
		assert('remember')
	}

	async get(key) {
		assert('get')
	}

	async forget(key) {
		assert('forget')
	}
}
