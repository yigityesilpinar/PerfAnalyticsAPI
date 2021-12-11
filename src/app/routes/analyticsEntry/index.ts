import { Router } from 'express'
import { body, validationResult } from 'express-validator'

import AnalyticsEntry from '../../models/AnalyticsEntry'

import { analyticsAccountRepository, analyticsEntryRepository } from '../../sequelize'
import { makeFilterByDateRange, onAccountNotFound, onBadRequest, onInternalError } from '../utils'

export const makeAnalyticsEntryRoute = (routes: Router) => {
  /**
   * @swagger
   * /account/{id}/analytics:
   *   post:
   *     summary: Post analytics data for an account
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         default: 1
   *         description: Numeric ID of the account to retrieve.
   *         schema:
   *           type: integer
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          name: PerformanceMetricsData
   *          description: Create analytic entires
   *          schema:
   *            required: true
   *            type: object
   *            properties:
   *              analyzeSessionUUID:
   *               required: true
   *               type: string
   *              analyzeStartAt:
   *               required: true
   *               type: string
   *               format: date-time
   *              ttfb:
   *               type: number
   *               required: true
   *              fcp:
   *               type: number
   *               required: true
   *              requestTime:
   *               type: number
   *               required: true
   *              responseTime:
   *               type: number
   *               required: true
   *              dnsLookUp:
   *               type: number
   *               required: true
   *              connectionTime:
   *               type: number
   *               required: true
   *              tlsTime:
   *               type: number
   *               required: true
   *              redirectTime:
   *               type: number
   *               required: true
   *              redirectCount:
   *               type: number
   *               required: true
   *              unloadTime:
   *               type: number
   *               required: true
   *              domInteractive:
   *               type: number
   *               required: true
   *              domComplete:
   *               type: number
   *               required: true
   *              domContentLoad:
   *               type: number
   *               required: true
   *              windowLoad:
   *               type: number
   *               required: true
   *     responses:
   *       200:
   *         description: OK
   */
  const validations = [body('analyzeStartAt').isISO8601(), body('analyzeSessionUUID').isString().notEmpty()]
  routes.post('/account/:id/analytics', ...validations, async (req, res) => {
    if (!req.params.id) {
      return onBadRequest(res)
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return onBadRequest(res, errors)
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
      return onInternalError(res, err)
    }
  })

  /**
   * @swagger
   * /account/{id}/analytics/{field}:
   *   get:
   *     summary: Retrieve an analytic field value and time for an analytic account.
   *     description:  Retrieve analytic field.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the account to retrieve.
   *         default: 1
   *         schema:
   *           type: integer
   *       - in: path
   *         name: field
   *         required: true
   *         description: Analytic field name to retrieve.
   *         schema:
   *           type: string
   *           enum:  [ttfb,fcp,requestTime,responseTime,dnsLookUp,connectionTime,tlsTime,redirectTime,redirectCount,unloadTime,domInteractive,domComplete,domContentLoad,windowLoad]
   *       - in: query
   *         name: start
   *         required: false
   *         description: The ISO Date string of the query range start.
   *         schema:
   *           type: string
   *       - in: query
   *         name: end
   *         required: false
   *         description: The ISO Date string of the query range end.
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
   *                  type: string
   *                  required: true
   *                  description: The status of response
   *                  example: ok
   *                data:
   *                  type: array
   *                  description: Response data
   *                  required: true
   *                  example: [{"ttfb":713.23,"analyzeStartAt":"2021-12-03T23:04:52.000Z"},{"ttfb":628.49,"analyzeStartAt":"2021-12-03T21:08:06.000Z"}]
   *                  items:
   *                    type: object
   *                    properties:
   *                      value:
   *                        required: true
   *                        type: number
   *                        description: The analytics field value requested from AnalyticsEntry table.
   *                        example: 21.23
   *                      analyzeStartAt:
   *                        required: true
   *                        type: string
   *                        description: The ISO Date string of the analytic field collection time.
   *                        example: 2021-12-03T23:04:52.000Z
   */
  routes.get('/account/:id/analytics/:field', async (req, res) => {
    if (!req.params.id) {
      return onBadRequest(res)
    }
    if (!req.params.field) {
      return onBadRequest(res, 'Paramater "field" is missing')
    }
    if (!AnalyticsEntry.rawAttributes[req.params.field]) {
      return onBadRequest(res, `Paramater "${req.params.field}" does not exist`)
    }
    try {
      const { id, field } = req.params
      // field
      const data = await analyticsEntryRepository.findAll({
        attributes: [field, 'analyzeStartAt'],
        where: {
          accountId: id,
          ...makeFilterByDateRange({
            fieldName: 'analyzeStartAt',
            start: typeof req.query.start === 'string' ? req.query.start : undefined,
            end: typeof req.query.end === 'string' ? req.query.end : undefined
          })
        }
      })
      // eslint-disable-next-line no-console
      res.status(200).json({
        status: 'ok',
        data: data.map((it: AnalyticsEntry) => ({
          analyzeStartAt: it.analyzeStartAt,
          value: it[field as keyof AnalyticsEntry]
        }))
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res, err)
    }
  })
}
