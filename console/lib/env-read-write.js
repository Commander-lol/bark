const TYPE_COMMENT = 'comment'
const TYPE_ENTRY = 'entry'
const TYPE_ROOT = 'root'

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
	return new Node(new Location(line), TYPE_ENTRY, { key, value })
}

class EnvironmentFile {
	constructor(file) {
		const lines = file.split('\n')

		const valueMap = {}
		const nodes = lines.map((line, i) => {
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
			map: { value: valueMap, writable: false, enumerable: true },
			nodes: { value: nodes, writable: false, enumerable: true },
		})
	}

	toString() {

	}
}

module.exports = EnvironmentFile
