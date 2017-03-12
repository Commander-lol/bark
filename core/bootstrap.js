require('dotenv').load()

global.env = (name, def = null) => {
	const val = process.env[name]
	if (val == null) {
		return def
	}
	return val
}
