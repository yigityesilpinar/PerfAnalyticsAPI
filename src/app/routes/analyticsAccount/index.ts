import { Router } from 'express'

import { analyticsAccountRepository } from '../../sequelize'
import { onAccountNotFound, onBadRequest, onInternalError } from '../utils'

export const makeAnalyticsAccountRoute = (routes: Router) => {
  /**
   * @swagger
   * /account/{perfAnalyticsId}:
   *   get:
   *     summary: Retrieve an analytic account data by perfAnalyticsId.
   *     description:  Retrieve an analytic account data by perfAnalyticsId.
   *     parameters:
   *       - in: path
   *         name: perfAnalyticsId
   *         required: true
   *         default: abcdefghjklmn
   *         description: Analytics id for the account.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An array of items
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                status:
   *                  required: true
   *                  type: string
   *                  description: The status of response
   *                  example: ok
   *                data:
   *                  description: Response data
   *                  example: {"id":"1","accountName":"Local test account"}
   *                  type: object
   *                  required: true
   *                  properties:
   *                   data:
   *                     type: object
   *                     required: true
   *                     properties:
   *                      id:
   *                        required: true
   *                        type: number
   *                        description: The analytics account id.
   *                        example: 21.23
   *                      accountName:
   *                        required: true
   *                        type: string
   *                        description: Name of the analytics account.
   *                        example: Local test account
   */
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
          data: {
            id: foundAccount.id,
            accountName: foundAccount.accountName
          }
        })
      } else {
        return onAccountNotFound(res)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res, err)
    }
  })
}
