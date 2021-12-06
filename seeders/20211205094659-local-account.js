'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'AnalyticsAccounts',
      [
        {
          perfAnalyticsId: 'abcdefghjklmn',
          accountName: 'Local test account',
          allowedDomains: '["http://localhost:3000","http://localhost:9000"]',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AnalyticsAccounts', null, {})
  }
}
