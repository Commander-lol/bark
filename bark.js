require('./core/bootstrap')
const app = require('./core/app')
const { logger } = service

app.listen(env('PORT', '5000'))
logger.debug(`Server listening on http://localhost:${env('PORT', '5000')}`)
