const AbstractCommand = require('../AbstractCommand')

module.exports = class CreateCommandCommand extends AbstractCommand {
	get name() {
		return 'create:controller'
	}

	static get usage() {
		return `usage: jeeves create#controller <name>`
	}

	static get description() {
		return 'Create a new controller'
	}

	run() {
		this.warn('Command not actually implemented')
	}
}
