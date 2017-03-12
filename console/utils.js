function loadModule(name) {
	try {
		return require('./' + name)
	} catch (e) {
		if (e.message.startsWith('Cannot find module')) {
			console.log(e)
			return null
		}
		throw e
	}
}

module.exports = {
	loadModule,
}
