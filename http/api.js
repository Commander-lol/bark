const hydrateUsers = require('./middleware/hydrate/user')
const hydratePosts = require('./middleware/hydrate/post')
const errorHandler = require('./middleware/errors/JsonError')

const { restrictToGroup: restrict } = require('./middleware/authentication')

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

router.use(errorHandler)

hydrateUsers(router)
hydratePosts(router)

router.get('/users', controller('users', 'index'))
router.get('/users/:userId', controller('users', 'one'))
router.post('/users', controller('users', 'create'))

router.get('/posts', controller('posts', 'index'))
router.get('/posts/:postId', controller('posts', 'one'))
router.post('/posts', restrict('editor'), controller('posts', 'create'))

module.exports = router
