const AbstractCommand = require('../AbstractCommand')

module.exports = class CreateCommandCommand extends AbstractCommand {
	get name() {
		return 'create#command'
	}

	static get usage() {
		return `usage: jeeves create#command <name>`
	}

	static get description() {
		return 'Create a new console command'
	}

	run() {
		this.warn('Command not actually implemented')
	}
}
