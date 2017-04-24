exports.string = value => String(value)
exports.number = value => Number(value)
exports.boolean = value => String(value).toLowerCase() === 'true'
exports.date = value => new Date(value)
exports.object = value => JSON.parse(value)
exports.array = value => Array.from(JSON.parse(value))

