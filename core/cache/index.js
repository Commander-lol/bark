const define = require('../utils/defineService')

define(module, require('./Interface'), () => require(`./${env('CACHE', 'memory')}`))
