import express from 'express'

import routes from './routes'

const port = process.env.PORT || 8080

const app = express()

import cors, { CorsOptions } from 'cors'

const allowedOrigins = ['http://localhost:3000']
const corsOptions: CorsOptions = {
  methods: 'POST',
  preflightContinue: true,
  exposedHeaders: ['Content-Type', 'Accept', 'Referer', 'User-agent'],
  allowedHeaders: ['Content-Type', 'Accept', 'Referer', 'User-agent'],
  credentials: true,
  origin: (origin, callback) => {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true)
    }
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(
        new Error('The CORS policy for this site does not allow access from the specified Origin.'),
        false
      )
    }
    return callback(null, true)
  }
}

app.use(express.json({ limit: '4mb' }))
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(routes)

app.listen(port)

// eslint-disable-next-line no-console
console.log(`Server is running at port: ${port}`)
