module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.INTEGER,
	}, {
		underscored: true,
		classMethods: {
			associate: function (models) {
				// associations can be defined here
			}
		},
	})
};
