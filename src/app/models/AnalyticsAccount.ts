import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table
class AnalyticsAccount extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  perfAnalyticsId: string

  @Column
  accountName: string

  @Column
  allowedDomains: string
}

export default AnalyticsAccount
