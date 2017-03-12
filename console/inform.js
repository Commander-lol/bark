const AbstractCommand = require('./AbstractCommand')
const { loadModule } = require('./utils')

module.exports = class HelpCommand extends AbstractCommand {
	static get usage() {
		return `usage: jeeves inform`
	}

	static get description() {
		return 'Prints information about installing additional modules'
	}

	get name() { return 'inform' }

	run(args) {
		this.info()
		this.info('Thanks for installing bark!')
		this.info('In order to use advanced configurations, you\'ll need to install extra modules')
		this.info()
		this.info('Here\'s the list of additional modules required by certain configurations:')
		this.info()
		this.info('CACHE=redis    redis')
		this.info()
		this.warn()
		this.warn('Trying to use these features without further setup will cause bark to crash!')
		this.warn()
	}
}
