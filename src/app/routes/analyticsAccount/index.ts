import { Router } from 'express'

import { analyticsAccountRepository } from '../../sequelize'
import { onAccountNotFound, onBadRequest, onInternalError } from '../utils'

export const makeAnalyticsAccountRoute = (routes: Router) => {
  routes.get('/account/:perfAnalyticsId', async (req, res) => {
    if (!req.params.perfAnalyticsId) {
      return onBadRequest(res)
    }
    const { perfAnalyticsId } = req.params
    try {
      const foundAccount = await analyticsAccountRepository.findOne({
        where: {
          perfAnalyticsId
        }
      })
      if (foundAccount) {
        return res.status(200).json({
          status: 'ok',
          data: foundAccount
        })
      } else {
        return onAccountNotFound(res)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res)
    }
  })
}
