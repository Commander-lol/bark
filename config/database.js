require('../core/bootstrap')

module.exports = {
	'development': {
		'username': 'root',
		'password': 'password',
		'database': 'bark_dev',
		'host': '127.0.0.1',
		'dialect': 'mysql',
	},
	'test': {
		'username': 'root',
		'password': 'password',
		'database': 'bark_test',
		'host': '127.0.0.1',
		'dialect': 'mysql',
	},
	'production': {
		'username': env('DB_USERNAME', 'root'),
		'password': env('DB_PASSWORD', 'password'),
		'database': env('DB_DATABASE', 'bark'),
		'host': env('DB_HOST', '127.0.0.1'),
		'dialect': env('DB_ADAPTER', 'mysql'),
	},
}
