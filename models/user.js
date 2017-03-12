'use strict';
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.NUMBER
	}, {
		underscored: true,
		classMethods: {
			associate: function (models) {
				// associations can be defined here
			}
		}
	});
	return User;
};
