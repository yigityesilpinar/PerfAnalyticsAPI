'use strict'

const mockAnalyticsEntriesData = require('./AnalyticsEntry.json')
const mockResourceAnalyticsEntriesData = require('./ResourceAnalyticsEntry.json')

async function getCount(queryInterface, tableName) {
  return (await queryInterface.sequelize.query(`select count(*) from "${tableName}"`))[0][0]['count']
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .bulkInsert(
        'AnalyticsAccounts',
        [
          {
            perfAnalyticsId: 'abcdefghjklmn',
            accountName: 'Local test account',
            allowedOrigins: '["http://localhost:3000","http://localhost:9000"]',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      )
      .then(async () => {
        const tableName = 'AnalyticsAccounts'
        const count = await getCount(queryInterface, tableName)
        queryInterface.sequelize.query(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${count + 1}`)
      })

    await queryInterface
      .bulkInsert(
        'AnalyticsEntries',
        mockAnalyticsEntriesData.map((it) => ({ ...it, createdAt: new Date(), updatedAt: new Date() })),
        {}
      )
      .then(async () => {
        const tableName = 'AnalyticsEntries'
        const count = await getCount(queryInterface, tableName)
        queryInterface.sequelize.query(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${count + 1}`)
      })
    await queryInterface
      .bulkInsert(
        'ResourceAnalyticsEntries',
        mockResourceAnalyticsEntriesData.map((it) => ({ ...it, createdAt: new Date(), updatedAt: new Date() })),
        {}
      )
      .then(async () => {
        const tableName = 'ResourceAnalyticsEntries'
        const count = await getCount(queryInterface, tableName)
        queryInterface.sequelize.query(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${count + 1}`)
      })
  },

  down: async (queryInterface, Sequelize) => {}
}
