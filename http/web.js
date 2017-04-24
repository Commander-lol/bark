const controller = (name, method) => require('./controllers/web/' + name)[method]
const Router = require('koa-router')
const router = new Router()

// router.get('/', controller('test', 'hello'))
router.get('/', controller('landing', 'index'))

module.exports = router
