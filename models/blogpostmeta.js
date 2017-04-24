module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlogPostMeta', {
    blog_post_id: DataTypes.STRING,
    featured_image: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
      	this.belongsTo(models.BlogPost, { as: 'blog_post' })
      },
    },
  })
};
