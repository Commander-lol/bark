const { User } = require('../../models')

exports.commit = user => user.save()

exports.findOne = query => User.findOne(query.get())

exports.find = query => User.findAll(query.get())
