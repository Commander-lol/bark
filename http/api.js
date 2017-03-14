const controller = (name, method) => require('./controllers/api/' + name)[method]
const hydrateUsers = require('./middleware/hydrate/user')
const Router = require('koa-router')
const router = (() => {
	if (env('API_STRATEGY') === 'path') {
		service.logger.info("Using path prefix")
		return new Router({ prefix: '/api' })
	}
	return new Router()
})()

hydrateUsers(router)

router.get('/users', controller('users', 'index'))
router.get('/users/:userId', controller('users', 'one'))
router.post('/users', controller('users', 'create'))

module.exports = router
