const { User } = require('../../models')
const Query = require('../Query')

exports.commit = user => user.save()

exports.create = data => exports.commit(User.build(data))

exports.findOne = query => User.findOne(query.get())

exports.find = query => User.findAll(query.get())

exports.all = () => exports.find((new Query))

exports.findById = id => exports.findOne((new Query).where('id', id))
