import { Sequelize } from 'sequelize-typescript'

import { AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry } from './models'

export const sequelize = new Sequelize({
  // repositoryMode: true,
  database: 'local-test',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  models: [AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry]
})

sequelize.connectionManager.getConnection({
  type: 'read'
})

export const analyticsAccountRepository = sequelize.getRepository(AnalyticsAccount)
export const analyticsEntryRepository = sequelize.getRepository(AnalyticsEntry)
export const resourceAnalyticsEntryRepository = sequelize.getRepository(ResourceAnalyticsEntry)
