import { Router } from 'express'

import { makeAnalyticsAccountRoute } from './analyticsAccount'
import { makeAnalyticsEntryRoute } from './analyticsEntry'
import { makeResourceAnalyticsEntryRoute } from './resourceAnalyticsEntry'
const routes = Router()

// just for health check
routes.get('/', (req, res) =>
  res.status(200).json({
    status: 'ok'
  })
)
makeAnalyticsAccountRoute(routes)
makeAnalyticsEntryRoute(routes)
makeResourceAnalyticsEntryRoute(routes)

export default routes
