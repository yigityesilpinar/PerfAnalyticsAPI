import { Sequelize } from 'sequelize-typescript'

import config from './config'
// https://github.com/sequelize/sequelize/issues/8019
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SequelizeRef = Sequelize as any
SequelizeRef.postgres.DECIMAL.parse = (value: string) => parseFloat(value)
import { AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry } from './models'

export const sequelize = new Sequelize({
  host: config.get('databaseHost'),
  database: config.get('databaseName'),
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  port: config.get('databasePort'),
  models: [AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry]
})

sequelize.connectionManager.getConnection({
  type: 'read'
})

export const analyticsAccountRepository = sequelize.getRepository(AnalyticsAccount)
export const analyticsEntryRepository = sequelize.getRepository(AnalyticsEntry)
export const resourceAnalyticsEntryRepository = sequelize.getRepository(ResourceAnalyticsEntry)
