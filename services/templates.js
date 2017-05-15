const hbs = require('handlebars')
const layout = require('handlebars-layouts')
const path = require('path')
const theme = require('./theme')
const Defer = require('defer-class')

module.exports = class TemplateRenderer {
	constructor(path, config) {
		this.path = path
		this.config = config
		this.loading = new Defer()
		this.hasInit = false

		const renderer = hbs.create()
		layout.register(renderer)
		this.renderer = renderer
	}

	async init() {
		this.hasInit = true
		const path = await theme.getPath()
		const fs = jetpack.cwd(path).dir('views')
		const layouts = await fs.listAsync('layouts')
		const partials = await fs.listAsync('partials')

		const loadPartial = async (prefix, name, path) => {
			const content = await fs.readAsync(path, 'utf8')
			this.renderer.registerPartial(prefix + '/' + name, content)
		}

		await Promise.all(layouts.map(layout => loadPartial('layouts', layout.split('.')[0], fs.path('layouts', layout))))
		await Promise.all(partials.map(partial => loadPartial('partials', partial.split('.')[0], fs.path('partials', partial))))

		this.loading.resolve()
	}

	async render(view, data) {
		// Lock rendering anything until we've initialised
		if (!this.hasInit) {
			await this.init()
		} else {
			await this.loading.promise
		}

		const viewData = Object.assign({ blog_name: env('SITE_NAME') }, data)

		const template = await jetpack.readAsync(path.join(this.path, 'views', `${view}.hbs`), 'utf8')
		const cmp = this.renderer.compile(template)
		return cmp(viewData)
	}
}
