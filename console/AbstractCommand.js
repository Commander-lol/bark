const chalk = require('chalk')

function formatWithSpaces(term) {
	const front = term.startsWith(' ') ? '' : ' '
	const back = term.endsWith(' ') ? '' : ' '
	return `${front}${term}${back}`
}

module.exports = class AbstractCommand {

	say(...messages) {
		console.log(
			chalk.bgWhite.black.italic.bold(formatWithSpaces(this.name || 'Command')),
			...messages
		)
	}

	info(...messages) {
		this.say(
			chalk.bgBlue.white.bold(' info  '),
			...messages
		)
	}

	error(...messages) {
		this.say(
			chalk.bgRed.white.bold(' error '),
			...messages
		)
	}

	warn(...messages) {
		this.say(
			chalk.bgYellow.white.bold(' warn  '),
			...messages
		)
	}
}
