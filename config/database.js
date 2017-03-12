require('../core/bootstrap')

// Sequelize cli expects env-namespaced config, but you should be using different env files
// in different environments, so this will always pull from the environment.

module.exports = {
	'development': {
		'username': env('DB_USERNAME', 'root'),
		'password': env('DB_PASSWORD'),
		'database': env('DB_DATABASE', 'bark_dev'),
		'host': env('DB_HOST', '127.0.0.1'),
		'dialect': env('DB_ADAPTER', 'mysql'),
	},
	'test': {
		'username': env('DB_USERNAME'),
		'password': env('DB_PASSWORD'),
		'database': env('DB_DATABASE', 'bark_test'),
		'host': env('DB_HOST', '127.0.0.1'),
		'dialect': env('DB_ADAPTER', 'mysql'),
	},
	'production': {
		'username': env('DB_USERNAME'),
		'password': env('DB_PASSWORD'),
		'database': env('DB_DATABASE', 'bark'),
		'host': env('DB_HOST', '127.0.0.1'),
		'dialect': env('DB_ADAPTER', 'mysql'),
	},
}
