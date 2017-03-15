const uuid = require('uuid')

module.exports = function(sequelize, DataTypes) {
   return sequelize.define('BlogPost', {
    id: {
    	type: DataTypes.STRING,
	  	defaultValue: uuid.v4,
	  	primaryKey: true,
	},
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    excerpt: DataTypes.TEXT,
    content: DataTypes.TEXT,
    author_id: {
    	type: DataTypes.INTEGER,
		references: {
    		model: 'User',
			key: 'id',
		},
	},
    draft: DataTypes.BOOLEAN,
    published_at: DataTypes.DATE,
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
      	this.belongsTo(models.User, { as: 'author' })
      }
    },
  })
};
