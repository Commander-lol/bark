module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Settings', [
			{
				name: 'theme',
				value: 'shiba',
				type: 'string',
				created_at: new Date(),
			},
			{
				name: 'date_format',
				value: 'dddd, MMMM Do YYYY, h:mm:ss a',
				type: 'string',
				created_at: new Date(),
			}
		], {})
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Settings', null, {})
	}
};
