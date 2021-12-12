import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, AllowNull } from 'sequelize-typescript'

import AnalyticsAccount from './AnalyticsAccount'
@Table
class AnalyticsEntry extends Model {
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
  analyzeSessionUUID: string

  @AllowNull(false)
  @Column
  analyzeStartAt: Date

  @AllowNull(false)
  @Column
  ttfb: number

  @AllowNull(false)
  @Column
  fcp: number

  @AllowNull(false)
  @Column
  requestTime: number

  @AllowNull(false)
  @Column
  responseTime: number

  @AllowNull(false)
  @Column
  dnsLookUp: number

  @AllowNull(false)
  @Column
  connectionTime: number

  @AllowNull(false)
  @Column
  tlsTime: number

  @AllowNull(false)
  @Column
  redirectTime: number

  @AllowNull(false)
  @Column
  redirectCount: number

  @AllowNull(false)
  @Column
  unloadTime: number

  @AllowNull(false)
  @Column
  domInteractive: number

  @AllowNull(false)
  @Column
  domComplete: number

  @AllowNull(false)
  @Column
  domContentLoad: number

  @AllowNull(false)
  @Column
  windowLoad: number
}

export default AnalyticsEntry
