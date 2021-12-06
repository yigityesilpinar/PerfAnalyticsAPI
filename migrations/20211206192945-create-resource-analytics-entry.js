'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ResourceAnalyticsEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      analyzeSessionUUID: {
        type: Sequelize.STRING
      },
      analyzeStartAt: {
        type: Sequelize.DATE
      },
      initiatorType: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      requestTime: {
        type: Sequelize.DECIMAL
      },
      responseTime: {
        type: Sequelize.DECIMAL
      },
      fetchTime: {
        type: Sequelize.DECIMAL
      },
      redirectTime: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ResourceAnalyticsEntries');
  }
};