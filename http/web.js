const controller = (name, method) => local('controllers/web/' + name)[method]
const Router = require('koa-router')
const router = new Router()

router.get('/', controller('test', 'hello'))

module.exports = router
