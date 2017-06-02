const controller = (name, method) => require('./controllers/admin/' + name)[method]
const Router = require('koa-router')
const router = new Router()

router.get('/', controller('core', 'index'))

module.exports = router
