const bcrypt = require('bcryptjs')

module.exports = {
	hash(password) {
		return bcrypt.hash(password, 10)
	},
	compare(password, hashed) {
		return bcrypt.compare(password, hashed)
	},
}
