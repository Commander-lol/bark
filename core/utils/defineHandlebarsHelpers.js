const Handlebars = require('handlebars')

Handlebars.registerHelper('plugin', function(pluginName) {
	return 'its plugin'
})

Handlebars.registerHelper('unplugin', function(pluginName) {
	return 'its not plugin'
})
