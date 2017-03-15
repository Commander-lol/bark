'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      excerpt: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      author_id: {
        type: Sequelize.INTEGER
      },
      draft: {
        type: Sequelize.BOOLEAN
      },
      published_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('BlogPosts');
  }
};
