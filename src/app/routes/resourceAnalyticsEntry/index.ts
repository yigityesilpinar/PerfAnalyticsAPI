import { Router } from 'express'

import { analyticsAccountRepository, resourceAnalyticsEntryRepository } from '../../sequelize'
import { onAccountNotFound, onBadRequest, onInternalError } from '../utils'

export const makeResourceAnalyticsEntryRoute = (routes: Router) => {
  routes.post('/account/:id/resourceAnalytics', async (req, res) => {
    if (!('length' in req.body || !req.params.id)) {
      return onBadRequest(res)
    }
    try {
      const { id } = req.params
      const foundAccount = await analyticsAccountRepository.findOne({
        where: {
          id: parseInt(id, 10)
        }
      })
      if (foundAccount) {
        const mappedEntries = req.body.map((it: Record<string, unknown>) => ({
          ...it,
          accountId: id
        }))
        await resourceAnalyticsEntryRepository.bulkCreate(mappedEntries)
        // eslint-disable-next-line no-console
        console.log(`success at post /account/${id}/resourceAnalytics`)
        res.status(200).send('ok')
      } else {
        return onAccountNotFound(res)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res)
    }
  })
  routes.get('/account/:id/resourceAnalytics', async (req, res) => {
    if (!req.params.id) {
      return onBadRequest(res)
    }
    try {
      const { id } = req.params
      const data = await resourceAnalyticsEntryRepository.findAll({
        where: {
          accountId: id
        }
      })
      // eslint-disable-next-line no-console
      res.status(200).json({
        status: 'ok',
        data
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res)
    }
  })
}
