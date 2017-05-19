const { BlogPost } = require('../../models')

exports.postCount = () => service.cache.remember('repo-meta-postcount', () => BlogPost.count())
