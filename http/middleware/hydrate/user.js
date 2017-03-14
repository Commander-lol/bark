const UserRepo = local('database/repositories/user')

module.exports = router => {
	router.param('userId', async (userId, ctx, next) => {
		const user = await UserRepo.findById(userId)
		if (user == null) {
			ctx.status = 404
			ctx.body = {
				message: 'Cannot find user ' + userId
			}
		} else {
			ctx.params.user = user
			await next()
		}
	})
}
