const app = new (require('koa'))

const web = require('../http/web')
const api = require('../http/api')

const { subdomains } = require('../http/utils')

const apply = router => {
	app.use(router.routes())
	app.use(router.allowedMethods())
}

app.on('error', err => service.logger.error(err))

if (env('API_STRATEGY') === 'path') {
	apply(web)
	apply(api)
} else {
	app.use(subdomains({
		'': web,
		'api': api,
	}))
}

module.exports = app
