const hbs = require('handlebars')
const layout = require('handlebars-layouts')
const path = require('path')
const theme = require('./theme')
const Defer = require('defer-class')
const moment = require('moment')

module.exports = class TemplateRenderer {

	static async initFromTheme() {
		const props = await Promise.all([
			theme.getPath(),
			theme.getThemeParams(),
		])

		const tmp = new TemplateRenderer(...props)

		await tmp.init()

		return tmp
	}

	static environmentPararms() {

		const meta = {
			title: env('SITE_NAME', 'Bark'),
			description: 'Hello World'
		}

		return {
			blog_name: env('SITE_NAME', 'bark'),
			meta,
		}
	}

	constructor(path, config) {
		this.path = path
		this.config = config
		this.loading = new Defer()
		this.hasInit = false

		const renderer = hbs.create()
		layout.register(renderer)

		renderer.registerHelper('add', (a, b) => Number(a) + Number(b))
		renderer.registerHelper('sub', (a, b) => Number(a) - Number(b))
		renderer.registerHelper('either', (a, b) => a ? a : b)
		renderer.registerHelper('time', time => moment.utc(time).format('dddd, MMMM Do YYYY, h:mm:ss a'))

		this.renderer = renderer
	}

	async init() {
		this.hasInit = true
		const path = this.path
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

		const template = await jetpack.readAsync(path.join(this.path, 'views', `${view}.hbs`), 'utf8')
		const cmp = this.renderer.compile(template)
		return cmp(data)
	}
}
