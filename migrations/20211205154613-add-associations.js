'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query( `ALTER TABLE "AnalyticsAccounts" ALTER COLUMN "id" SET DATA TYPE BIGINT;`)
    await queryInterface.sequelize.query( `ALTER TABLE "ResourceAnalyticsEntries" ALTER COLUMN "name" SET DATA TYPE VARCHAR(750);`)
    await queryInterface.addColumn('AnalyticsEntries', 'accountId', Sequelize.BIGINT, {})
    await queryInterface.addConstraint('AnalyticsEntries', {
      fields: ['accountId'],
      type: 'foreign key',
      name: 'accountId_fkey_analytics_to_accounts',
      references: {
        //Required field
        table: 'AnalyticsAccounts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addColumn('ResourceAnalyticsEntries', 'accountId', Sequelize.BIGINT, {})
    await queryInterface.addConstraint('ResourceAnalyticsEntries', {
      fields: ['accountId'],
      type: 'foreign key',
      name: 'accountId_fkey_resources_to_accounts',
      references: {
        //Required field
        table: 'AnalyticsAccounts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query( `ALTER TABLE "AnalyticsAccounts" ALTER COLUMN "id" SET DATA TYPE INT;`)
    await queryInterface.sequelize.query( `ALTER TABLE "ResourceAnalyticsEntries" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);`)
    await queryInterface.removeColumn('AnalyticsEntries', 'accountId', {})
    await queryInterface.removeConstraint('AnalyticsEntries', 'accountId_fkey_analytics_to_accounts', {})
    await queryInterface.removeColumn('ResourceAnalyticsEntries', 'accountId', {})
    await queryInterface.removeConstraint('ResourceAnalyticsEntries', 'accountId_fkey_resources_to_accounts', {})
  }
}
