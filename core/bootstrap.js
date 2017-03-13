require('dotenv').load()

global.env = (name, def = null) => {
	const val = process.env[name]
	if (val == null || val === '') {
		return def
	}
	return val
}

// Services should be defined as getters instead of directly requiring in the services
// object to 1) prevent rewriting 2) lazy load. This bootstrap is also used for jeeves
// and config files, so avoiding eager-loading of dependencies that are't used is a
// performance consideration
global.service = {
	get logger() {
		return require('./logger')
	},
	get cache() {
		return require('./cache')
	},
}

// Root level require for local modules without needing to set NODE_PATH
global.local = path => require('../' + path)
