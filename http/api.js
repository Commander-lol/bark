const controller = (name, method) => require('./controllers/api/' + name)[method]
const Router = require('koa-router')
const router = (() => {
	if (env('API_STRATEGY') === 'path') {
		service.logger.info("Using path prefix")
		return new Router({ prefix: '/api' })
	}
	return new Router()
})()

router.get('/', controller('test', 'hello'))

module.exports = router
