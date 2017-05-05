const hydrateUsers = require('./middleware/hydrate/user')
const hydratePosts = require('./middleware/hydrate/post')
const Router = require('koa-router')

const controller = (name, method) => require('./controllers/api/' + name)[method]
const router = (() => {
	if (env('API_STRATEGY') === 'path') {
		service.logger.debug('Using path prefix for API')
		return new Router({ prefix: '/api' })
	}
	service.logger.debug('Using subdomain resolution for API')
	return new Router()
})()

hydrateUsers(router)
hydratePosts(router)

router.get('/users', controller('users', 'index'))
router.get('/users/:userId', controller('users', 'one'))
router.post('/users', controller('users', 'create'))

router.get('/posts', controller('posts', 'index'))
router.get('/posts/:postId', controller('posts', 'one'))
router.post('/posts', controller('posts', 'create'))

module.exports = router
