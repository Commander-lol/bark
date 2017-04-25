#! /usr/bin/env node

require('./core/bootstrap')
const neodoc = require('neodoc')
const { loadModule } = require('./console/utils')
const fs = require('fs-jetpack')
const chalk = require('chalk')

const COMMAND_DELIM = '#'

const usage = `

usage: jeeves [<command>] [<args>...]

`
const args = neodoc.run(usage)

const nameToPath = name => name.split(COMMAND_DELIM).join('/')
const pathToName = path => path.split('/').join(COMMAND_DELIM)

if (args['<command>']) {
	const Command = loadModule(nameToPath(args['<command>']))
	const subargs = neodoc.run(Command.usage)
	const instance = new Command()
	instance.run(subargs)
} else {
	const Type = require('./console/AbstractCommand')
	const filter = [ 'utils.js', 'lib', 'AbstractCommand.js' ]
	const delve = (dir) => {
		return dir.list().reduce((acc, cur) => {
			if (filter.includes(cur)) return acc

			if (dir.exists(cur) === 'dir') {
				acc[cur] = delve(dir.cwd(cur))
			} else {
				const val = require(dir.path(cur))
				if (val.prototype && val.prototype instanceof Type) {
					acc[cur.endsWith('.js') ? cur.substr(0, cur.length - 3) : cur] = val
				}
			}
			return acc
		}, {})
	}
	const structure = delve(fs.cwd('console'))
	const print = (obj, parentName = '') => {
		const nameWithParent = n => parentName ? `${parentName}${COMMAND_DELIM}${n}` : n

		Object.entries(obj)
			.sort((a, b) => {
				if (a[1].prototype !== b[1].prototype) {
					if (a[1].prototype instanceof Type) {
						return -1
					} else {
						return 1
					}
				} else {
					return 0
				}
			})
			.forEach(([key, value]) => {
				if (value.prototype instanceof Type) {
					console.log(' ', chalk.green.bold(key === 'index' ? parentName : nameWithParent(key)), '\t\t', chalk.gray(value.description || 'No description'))
				} else {
					if (Object.entries(value).length > 1) {
						console.log()
						console.log(chalk.yellow.bold.italic(key + '  '))
						print(value, key)
					} else if (Object.entries(value).length === 1) {
						const entry = Object.entries(value)[0]
						let compound = key + COMMAND_DELIM + entry[0]
						console.log(' ', chalk.green.bold(compound === 'index' ? parentName : nameWithParent(compound)), '\t\t', chalk.gray(entry[1].description || 'No description'))
					}
				}
			})
	}

	console.log()
	console.log(chalk.bold('Commands:'))
	console.log()
	print(structure)
	console.log()
}
