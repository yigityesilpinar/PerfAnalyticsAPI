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
    env: 'PERF_ANALYTICS_API'
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
  databaseHost: {
    doc: 'Database Host',
    format: String,
    default: 'localhost',
    env: 'DATABASE_HOST'
  }
})

config.validate({ allowed: 'strict' })

export default config
