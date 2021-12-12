import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import * as packageJSON from '../../package.json'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      description: packageJSON.description,
      title: 'PerfAnalyticsAPI',
      version: packageJSON.version,
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Yigit Yesilpinar',
        url: packageJSON.author
      }
    }
  },
  apis: ['./src/app/routes/**/*.ts'],
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server'
    },
    { url: 'https://yy-perf-analytics-api.herokuapp.com', description: 'Production server' }
  ]
}

const openapiSpecification = swaggerJsdoc(options)
export default openapiSpecification
