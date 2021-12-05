import { Router } from 'express'

import { analyticsAccountRepository, analyticsEntryRepository } from '../../sequelize'
import { onAccountNotFound, onBadRequest, onInternalError } from '../utils'

export const makeAnalyticsEntryRoute = (routes: Router) => {
  routes.post('/account/:id/analytics', async (req, res) => {
    if (!req.params.id) {
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
        await analyticsEntryRepository.create({
          ...req.body,
          accountId: id
        })
        // eslint-disable-next-line no-console
        console.log(`success at post /account/${id}/analytics`)
        // cors blocks the response if its json type
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
}
