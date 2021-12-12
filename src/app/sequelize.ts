import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import config from './config'
// https://github.com/sequelize/sequelize/issues/8019
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SequelizeRef = Sequelize as any
SequelizeRef.postgres.DECIMAL.parse = (value: string) => parseFloat(value)
import { AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry } from './models'

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: config.get('databaseHost'),
  database: config.get('databaseName'),
  username: config.get('databaseUser'),
  password: config.get('databasePassword'),
  port: config.get('databasePort'),
  ...(process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    : {}),
  models: [AnalyticsAccount, AnalyticsEntry, ResourceAnalyticsEntry]
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.connectionManager.getConnection({
  type: 'read'
})

export const analyticsAccountRepository = sequelize.getRepository(AnalyticsAccount)
export const analyticsEntryRepository = sequelize.getRepository(AnalyticsEntry)
export const resourceAnalyticsEntryRepository = sequelize.getRepository(ResourceAnalyticsEntry)
