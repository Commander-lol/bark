const AbstractCommand = require('./AbstractCommand')
const { loadModule } = require('./utils')
const { spawn } = require('child_process')

module.exports = class HelpCommand extends AbstractCommand {
	static get usage() {
		return `usage: jeeves repl`
	}

	static get description() {
		return 'Start a standard node repl containing the bark bootstrap'
	}

	get name() { return 'repl' }

	run() {
		spawn(`node`, ['-r', './core/bootstrap.js'], {
			cwd: jetpack.cwd(),
			shell: true,
			stdio: 'inherit',
		})
	}
}
