const { BlogPost, User } = require('../../models')
const Query = require('../Query')

const baseQuery = exports.baseQuery = () => (new Query).with('author', User)

exports.commit = post => post.save()

exports.create = async data => {
	const post = await exports.commit(BlogPost.build(data))
	return await exports.findById(post.id)
}

exports.findOne = query => BlogPost.findOne(query.get())

exports.find = query => BlogPost.findAll(query.get())

exports.all = () => exports.find(baseQuery())

// id is a uuid, reasonably certain that it won't collide with a pretty slug
// (Also you're an asshole if you get the uuid of one post and set it as the
// slug of another post, so you deserve everything you get in that case)
exports.findById = id => BlogPost.findOne({
	where: { $or: { id, slug: id } },
	include: [{
		model: User,
		as: 'author',
	}]
})
