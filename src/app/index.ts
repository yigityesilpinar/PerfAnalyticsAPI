import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'

import swaggerUi from 'swagger-ui-express'

import { makeCorsOptions } from './middlewares/corsMiddleware'
import config from './config'
import routes from './routes'
import swaggerSpec from './swagger'

const port = config.get('port')
const host = config.get('host')

const app = express()
app.use(helmet())
app.use(compression())
app.use(express.json({ limit: '4mb' }))
app.options(
  '*',
  cors(
    makeCorsOptions({
      allowedOrigins: '*',
      methods: ['POST']
    })
  )
)

app.use(routes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api-docs', (req, res) => res.json(swaggerSpec))

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port: ${port}`)
})
