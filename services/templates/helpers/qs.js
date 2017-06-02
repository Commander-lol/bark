const querystring = require('querystring')

function filterQueryString(...args) {
	const { data } = args.pop()
	const queryStringData = Object.assign({}, data.root._qsdata)
	args.forEach(arg => delete queryStringData[arg])
	return querystring.stringify(queryStringData)
}

function prependIfExistant(char, str) {
	if (str) {
		return char + str
	}
	return str
}

module.exports = function(hbs) {
	hbs.registerHelper('qs', filterQueryString)
	hbs.registerHelper('qsa', (...args) => prependIfExistant('&', filterQueryString(...args)))
	hbs.registerHelper('qsq', (...args) => prependIfExistant('?', filterQueryString(...args)))
}
