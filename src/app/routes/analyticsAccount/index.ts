import { Router } from 'express'

import { accountFetchSecurityMiddleware } from '../../middlewares/corsMiddleware'
import { onBadRequest } from '../utils'

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
  routes.get('/account/:perfAnalyticsId', accountFetchSecurityMiddleware, (req, res) => {
    if (!req.foundAccount) {
      return onBadRequest(res)
    }
    return res.status(200).json({
      status: 'ok',
      data: {
        id: req.foundAccount.id,
        accountName: req.foundAccount.accountName
      }
    })
  })
}
