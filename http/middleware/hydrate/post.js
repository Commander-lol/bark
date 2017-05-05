const PostRepo = local('database/repositories/post')

module.exports = router => {
	router.param('postId', async (postId, ctx, next) => {
		const post = await PostRepo.findById(postId)
		if (post == null) {
			ctx.status = 404
			ctx.body = {
				message: 'Cannot find post ' + postId
			}
		} else {
			ctx.params.post = post
			await next()
		}
	})
}
