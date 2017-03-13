const controller = (name, method) => local('controllers/api/' + name)[method]
const Router = require('koa-router')
const router = (() => {
	if (env('API_STRATEGY') === 'path') {
		service.logger.info("Using path prefix")
		return new Router({ prefix: '/api' })
	}
	return new Router()
})()

router.get('/users', controller('users', 'index'))
router.post('/users', controller('users', 'create'))

module.exports = router
