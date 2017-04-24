const Interface = require('./Interface')

const cache = new Map()

const make = key => `${env('CACHE_KEY', '')}${key}`

class MemoryCache extends Interface {
	static get MemoryCache() { return MemoryCache }

	async remember(key, fn) {
		key = make(key)

		if (cache.has(key)) return cache.get(key)

		const result = await fn()
		cache.set(key, result)

		return result
	}

	async get(key) {
		return cache.get(make(key)) || null
	}

	async set(key, fn) {
		const result = await fn()
		cache.set(make(key), result)

		return result
	}

	async forget(key) {
		return cache.delete(make(key))
	}
}

module.exports = new MemoryCache()
