import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'

@Table
class AnalyticsAccount extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Column
  perfAnalyticsId: string

  @AllowNull(false)
  @Column
  accountName: string

  @Column
  allowedOrigins: string
}

export default AnalyticsAccount
