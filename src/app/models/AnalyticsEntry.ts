import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript'

import AnalyticsAccount from './AnalyticsAccount'
@Table
class AnalyticsEntry extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => AnalyticsAccount)
  @Column
  accountId: number

  @Column
  analyzeSessionUUID: string

  @Column
  analyzeStartTimestamp: number

  @Column
  ttfb: number

  @Column
  fcp: number

  @Column
  requestTime: number

  @Column
  responseTime: number

  @Column
  dnsLookUp: number

  @Column
  connectionTime: number

  @Column
  tlsTime: number

  @Column
  redirectTime: number

  @Column
  redirectCount: number

  @Column
  unloadTime: number

  @Column
  domInteractive: number

  @Column
  domComplete: number

  @Column
  domContentLoad: number
}

export default AnalyticsEntry
