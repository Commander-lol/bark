const Interface = require('./Interface')

const cache = new Map()

class MemoryCache extends Interface {
	static get MemoryCache() { return MemoryCache }

	async remember(key, fn) {
		if (cache.has(key)) return cache.get(key)

		const result = await fn()
		cache.set(key, result)

		return result
	}

	async get(key) {
		return cache.get(key) || null
	}

	async forget(key) {
		return cache.delete(key)
	}
}

module.exports = new MemoryCache()
