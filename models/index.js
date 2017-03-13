const fs = require('fs-jetpack');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = local('config/database.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
	.list(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach(function(file) {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	})

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
