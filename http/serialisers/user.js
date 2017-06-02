module.exports = function serialiseUser(user) {
	return {
		email: user.email,
		username: user.username,
	}
}
