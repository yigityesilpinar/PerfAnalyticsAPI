import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, AllowNull } from 'sequelize-typescript'

import AnalyticsAccount from './AnalyticsAccount'

@Table
class ResourceAnalyticsEntry extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => AnalyticsAccount)
  @AllowNull(false)
  @Column
  accountId: number

  @AllowNull(false)
  @Column
  initiatorType: string

  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column
  analyzeSessionUUID: string

  @AllowNull(false)
  @Column
  analyzeStartAt: Date

  @AllowNull(false)
  @Column
  requestTime: number

  @AllowNull(false)
  @Column
  responseTime: number

  @AllowNull(false)
  @Column
  fetchTime: number

  @AllowNull(false)
  @Column
  redirectTime: number
}

export default ResourceAnalyticsEntry
