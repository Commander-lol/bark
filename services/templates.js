const hbs = require('handlebars')
const path = require('path')

module.exports = class TemplateRenderer {
	constructor(path, config) {
		this.path = path
		this.config = config
	}

	async render(view, data) {
		const template = await jetpack.readAsync(path.join(this.path, 'views', `${view}.hbs`), 'utf8')
		const cmp = hbs.compile(template)
		const t = cmp(data)
		console.log(t)
		return t
	}
}
