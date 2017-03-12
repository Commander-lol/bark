require('dotenv').load()

global.env = (name, def = null) => {
	const val = process.env[name]
	if (val == null) {
		return def
	}
	return val
}

global.service = {
	get logger() {
		return require('./logger')
	},
	get cache() {
		return require('./cache')
	},
}
