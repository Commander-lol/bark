const AbstractCommand = require('./AbstractCommand')
const { loadModule } = require('./utils')

module.exports = class HelpCommand extends AbstractCommand {
	static get usage() {
		return `usage: jeeves help <command>`
	}

	static get description() {
		return 'Prints out help text for a given command'
	}

	get name() { return 'help' }

	run(args) {
		const Command = loadModule(args['<command>'])
		if (Command) {
			this.info('Command', args['<command>'])
			this.info(Command.description || 'No description provided')
			Command.usage ?
				this.info(Command.usage) :
				this.error('No usage found, please provide usage otherwise the command wont work!')
		} else {
			this.error('No such command', args['<command>'])
		}
	}
}
