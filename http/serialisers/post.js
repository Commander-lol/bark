const user = require('./user')

module.exports = function serialisePost(post) {
	return {
		title: post.title,
		slug: post.slug,
		content: post.slug,
		author: user(post.author),
	}
}
