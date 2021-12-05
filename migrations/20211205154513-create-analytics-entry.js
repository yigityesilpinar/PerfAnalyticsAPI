'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AnalyticsEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      analyzeSessionUUID: {
        type: Sequelize.STRING
      },
      analyzeStartTimestamp: {
        type: Sequelize.DECIMAL
      },
      ttfb: {
        type: Sequelize.DECIMAL
      },
      fcp: {
        type: Sequelize.DECIMAL
      },
      requestTime: {
        type: Sequelize.DECIMAL
      },
      responseTime: {
        type: Sequelize.DECIMAL
      },
      dnsLookUp: {
        type: Sequelize.DECIMAL
      },
      connectionTime: {
        type: Sequelize.DECIMAL
      },
      tlsTime: {
        type: Sequelize.DECIMAL
      },
      domContentLoad: {
        type: Sequelize.DECIMAL
      },
      redirectTime: {
        type: Sequelize.DECIMAL
      },
      redirectCount: {
        type: Sequelize.DECIMAL
      },
      unloadTime: {
        type: Sequelize.DECIMAL
      },
      domInteractive: {
        type: Sequelize.DECIMAL
      },
      domComplete: {
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
    await queryInterface.dropTable('AnalyticsEntries');
  }
};