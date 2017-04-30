const TYPE_COMMENT = 'comment'
const TYPE_ENTRY = 'entry'

const CRLF = /\r\n/
const LFCR = /\n\r/

class Location {
	constructor(line, column = 0) {
		this.line = line
		this.column = column
	}
}

class Node {
	constructor(location, type, contents) {
		this.location = location
		this.type = type
		this.contents = contents
	}
}

function comment(line, contents) {
	return new Node(new Location(line), TYPE_COMMENT, contents)
}
function entry(line, contents) {
	const [key, value] = contents.split('=').map(s => s.trim())
	return new Node(new Location(line), TYPE_ENTRY, {key, value})
}
const serialiseEntry = ({ contents }) => `${contents.key}=${contents.value == null ? '' : contents.value}`

class EnvironmentFile {
	constructor(file, lineEndings = 'preserve') {
		this.lineEnding = lineEndings !== 'preserve' ? lineEndings : (() => {
			if (CRLF.test(file)) {
				return '\r\n'
			} else if (LFCR.test(file)) {
				return '\n\r'
			} else {
				return '\n'
			}
		})()

		const valueMap = {}
		const nodes = file.split(/\r\n|\n\r|\n/).map((line, i) => {
			const trimmed = line.trim()
			if (trimmed === '' || trimmed.startsWith('#')) {
				return comment(i, line)
			} else {
				const kventry = entry(i, line)
				valueMap[kventry.contents.key] = i
				return kventry
			}
		})

		Object.defineProperties(this, {
			/** map is a relation of env file data key to node list index, for faster lookups of KV entries**/
			map: { value: valueMap, writable: true, enumerable: true },
			/** nodes is the parsed list of entries in the env file **/
			nodes: { value: nodes, writable: true, enumerable: true },
		})
	}

	toString() {
		return this.nodes
			.map(node => {
				if (node.type === TYPE_COMMENT) {
					return node.contents
				} else if (node.type === TYPE_ENTRY) {
					return serialiseEntry(node)
				}
				return false
			})
			.filter(node => typeof node === 'string')
			.join(this.lineEnding)
	}

	value(key, value) {
		if (typeof value !== 'undefined') {
			if (key in this.map) {
				this.nodes[this.map[key]].contents.value = value
			} else {
				const idx = this.nodes.length
				this.nodes.push(entry(idx, { key, value }))
				this.map[key] = idx
			}
			return undefined
		} else {
			if (key in this.map) {
				return this.nodes[this.map[key]].contents.value
			} else {
				return undefined
			}
		}
	}

	entry(key) {
		if (key in this.map) {
			return serialiseEntry(this.nodes[this.map[key]])
		}
	}

	remove(key) {
		if (key in this.map) {
			const idx = this.map[key]
			delete this.map[key]
			this.nodes = this.nodes.filter((_, i) => i !== idx)
			this.map = Object.entries(this.map).reduce((acc, [key, pos]) => Object.assign(acc, {
				[key]: pos > idx ? pos - 1 : pos
			}), {})

			return true
		} else {
			return false
		}
	}
}

module.exports = EnvironmentFile
