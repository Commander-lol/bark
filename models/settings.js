const types = local('core/utils/settingsTypes')
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Settings', {
		name: DataTypes.STRING,
		value: {
			type: DataTypes.STRING,
			get: function() {
				const value = this.getDataValue('value')
				const type = this.getDataValue('type')

				if (!types.hasOwnProperty(type)) throw new Error(`No such settings type ${type}`)

				return types[type](value)
			},
		},
		type: DataTypes.STRING,
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {},
		},
	})
}
