import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript'

import AnalyticsAccount from './AnalyticsAccount'

@Table
class ResourceAnalyticsEntry extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => AnalyticsAccount)
  @Column
  accountId: number

  @Column
  initiatorType: string

  @Column
  name: string

  @Column
  analyzeSessionUUID: string

  @Column
  analyzeStartTimestamp: number

  @Column
  requestTime: number

  @Column
  responseTime: number

  @Column
  fetchTime: number

  @Column
  redirectTime: number
}

export default ResourceAnalyticsEntry
