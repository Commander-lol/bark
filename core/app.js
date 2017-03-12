const app = new (require('koa'))

app.on('error', err => service.logger.error(err))

module.exports = app
