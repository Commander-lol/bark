const hbs = require('handlebars')
const layout = require('handlebars-layouts')
const path = require('path')
const theme = require('./theme')
const Defer = require('defer-class')

module.exports = class TemplateRenderer {
	static get hbs() {
		return hbs
	}

	constructor(path, config) {
		this.path = path
		this.config = config
		this.loading = new Defer()

		const renderer = hbs.create()
		layout.register(renderer)
		this.renderer = renderer
	}

	async init() {
		const path = await theme.getPath()
		const fs = jetpack.cwd(path).dir('views')
		const layouts = await fs.listAsync('layouts')

		const loadPartial = async (prefix, name, path) => {
			const content = await fs.readAsync(path, 'utf8')
			this.renderer.registerPartial(prefix + '/' + name, content)
		}

		await Promise.all(layouts.map(layout => loadPartial('layouts', layout.split('.')[0], fs.path('layouts', layout))))

		this.loading.resolve()
	}

	async render(view, data) {
		// Lock rendering anything until we've initialised
		await this.loading.promise

		service.logger.info(this.renderer)
		const template = await jetpack.readAsync(path.join(this.path, 'views', `${view}.hbs`), 'utf8')
		const cmp = this.renderer.compile(template)
		const t = cmp(data)
		console.log(t)
		return t
	}
}
