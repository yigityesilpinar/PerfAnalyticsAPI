import convict from 'convict'

const config = convict({
  env: {
    doc: 'Node environment.',
    format: ['development', 'test', 'production'],
    default: 'production',
    env: 'NODE_ENV'
  },
  appEnv: {
    doc: 'Applicaton environment.',
    format: ['development', 'staging', 'production'],
    default: 'development',
    env: 'APP_ENV'
  },
  host: {
    doc: 'Server host',
    format: String,
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'Server port',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  perfAnalyticsDashboardHost: {
    doc: 'Perf analytics dashboard host',
    format: String,
    default: 'http://localhost:9000',
    env: 'PERF_ANALYTICS_DASHBOARD_URL'
  },
  databaseHost: {
    doc: 'Database Host',
    format: String,
    default: 'localhost',
    env: 'DATABASE_HOST'
  },
  databaseName: {
    doc: 'Name of the database',
    format: String,
    default: 'local-test',
    env: 'DATABASE_NAME'
  },
  databasePort: {
    doc: 'Database port',
    format: Number,
    default: 5432,
    env: 'DATABASE_PORT'
  },
  databaseUser: {
    doc: 'Database username',
    format: String,
    default: 'postgres',
    env: 'DATABASE_USER'
  },
  databasePassword: {
    doc: 'Database password',
    format: String,
    default: 'postgres',
    env: 'DATABASE_PASSWORD'
  },
  databaseUrl: {
    doc: 'Database url',
    format: String,
    default: '',
    env: 'DATABASE_URL'
  }
})

config.validate({ allowed: 'strict' })

export default config
