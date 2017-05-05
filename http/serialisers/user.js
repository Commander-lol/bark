module.exports = function serialiseUser(user) {
	console.log(user)
	return {
		email: user.email,
		username: user.username,
	}
}
