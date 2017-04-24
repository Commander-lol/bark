const app = new (require('koa'))
const body = require('koa-bodyparser')

const web = local('http/web')
const api = local('http/api')

const { subdomains } = local('http/utils')
const httpLogger = local('http/middleware/logging/http')

const apply = router => {
	app.use(router.routes())
	app.use(router.allowedMethods())
}

app.on('error', err => service.logger.error(err))

app.use(body())

app.use(httpLogger)

if (env('API_STRATEGY') === 'path') {
	apply(web)
	apply(api)
} else {
	app.use(subdomains({
		'': web,
		'api': api,
	}))
}

process.on('unhandledRejection', (err, p) => {
	service.logger.critical(err)
})

module.exports = app
