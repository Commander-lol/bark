const Command  = require('./AbstractCommand')

module.exports = class ConfigureCommand extends Command {
	static get usage() {
		return 'usage: jeeves configure [-y]'
	}

	static get description() {
		return 'Configure application for usage'
	}

	static get detailed() {
		return 'Configure application for usage. Creates a .env file if it doesn\'t already exist, or updates an existing one if it does. Providing -y option accepts all defaults.'
	}

	get name() {
		return 'configure'
	}

	run(args) {

	}
}
