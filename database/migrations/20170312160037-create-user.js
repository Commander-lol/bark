'use strict';
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			role: {
				type: Sequelize.NUMBER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('Users');
	},
}
