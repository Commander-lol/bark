const { Settings } = require('../../models')
const Query = require('../Query')

exports.commit = setting => setting.save()

exports.findOne = query => Settings.findOne(query.get())

exports.find = (query = (new Query)) => Settings.findAll(query.get())

exports.byName = name => exports.findOne((new Query).where('name', name))
