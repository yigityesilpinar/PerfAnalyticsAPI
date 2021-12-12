import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { fn, col, cast } from 'sequelize'
import ResourceAnalyticsEntry from '../../models/ResourceAnalyticsEntry'

import {
  accountPostSecurityMiddleware,
  dashboardAnalyticsFetchSecurityMiddleware
} from '../../middlewares/corsMiddleWare'
import { resourceAnalyticsEntryRepository } from '../../sequelize'
import { makeFilterByDateRange, onBadRequest, onInternalError } from '../utils'

export const makeResourceAnalyticsEntryRoute = (routes: Router) => {
  /**
   * @swagger
   * /account/{id}/resourceAnalytics:
   *   post:
   *     summary: Post resource analytics data for an account
   *     parameters:
   *       - in: path
   *         name: id
   *         default: 1
   *         required: true
   *         description: Numeric ID of the account to retrieve.
   *         schema:
   *           type: integer
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          name: ResourceMetricsDatas
   *          description: Create resource analytic entires
   *          schema:
   *            type: array
   *            required: true
   *            items:
   *              required: true
   *              type: object
   *              properties:
   *                analyzeSessionUUID:
   *                 type: string
   *                 required: true
   *                analyzeStartAt:
   *                 type: string
   *                 format: date-time
   *                 required: true
   *                initiatorType:
   *                 type: string
   *                 required: true
   *                name:
   *                 required: true
   *                 type: string
   *                requestTime:
   *                 type: number
   *                 required: true
   *                responseTime:
   *                 type: number
   *                 required: true
   *                fetchTime:
   *                 type: number
   *                 required: true
   *                redirectTime:
   *                 type: number
   *                 required: true
   *     responses:
   *       200:
   *         description: OK
   */
  const validations = [body('*.analyzeStartAt').isISO8601(), body('*.analyzeSessionUUID').isString().notEmpty()]
  routes.post('/account/:id/resourceAnalytics', ...validations, accountPostSecurityMiddleware, async (req, res) => {
    if (!('length' in req.body || !req.params.id || !req.foundAccount)) {
      return onBadRequest(res)
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return onBadRequest(res, errors)
    }
    try {
      const mappedEntries = req.body.map((it: Record<string, unknown>) => ({
        ...it,
        accountId: req.foundAccount.id
      }))
      await resourceAnalyticsEntryRepository.bulkCreate(mappedEntries)
      res.status(200).send('ok')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res, err)
    }
  })

  /**
   * @swagger
   * /account/{id}/resourceAnalytics/{field}:
   *   get:
   *     summary: Retrieve resource analytic field value and time array for an analytic account.
   *     description: Retrieve resource analytic field.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         default: 1
   *         description: Numeric ID of the account to retrieve.
   *         schema:
   *           type: integer
   *       - in: path
   *         name: field
   *         required: true
   *         description: Resource analytic field name to retrieve.
   *         schema:
   *           type: string
   *           enum: [initiatorType, requestTime, responseTime, fetchTime, redirectTime]
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
   *                  required: true
   *                  type: string
   *                  description: The status of response
   *                  example: ok
   *                data:
   *                  required: true
   *                  type: array
   *                  description: Response data
   *                  example: [{"fetchTime":868.62,"analyzeStartAt":"2021-12-05T16:56:08.000Z"},{"fetchTime":629.73,"analyzeStartAt":"2021-12-04T03:49:07.000Z"}]
   *                  items:
   *                    type: object
   *                    required: true
   *                    properties:
   *                     value:
   *                       required: true
   *                       type: number
   *                       description: The analytics field value requested from AnalyticsEntry table.
   *                       example: 21.23
   *                     analyzeStartAt:
   *                       required: true
   *                       type: string
   *                       description: The ISO Date string of the analytic field collection time.
   *                       example: 2021-12-03T23:04:52.000Z
   */
  routes.get('/account/:id/resourceAnalytics/:field', dashboardAnalyticsFetchSecurityMiddleware, async (req, res) => {
    if (!req.params.id) {
      return onBadRequest(res)
    }
    if (!req.params.field) {
      return onBadRequest(res, 'Paramater "field" is missing')
    }
    if (!ResourceAnalyticsEntry.rawAttributes[req.params.field]) {
      return onBadRequest(res, `Paramater "${req.params.field}" does not exist`)
    }
    try {
      const { id, field } = req.params
      const data = await resourceAnalyticsEntryRepository.findAll({
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
        data: data.map((it: ResourceAnalyticsEntry) => ({
          analyzeStartAt: it.analyzeStartAt,
          value: it[field as keyof ResourceAnalyticsEntry]
        }))
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return onInternalError(res, err)
    }
  })

  /**
   * @swagger
   * /account/{id}/resourceAnalyticsByType/{field}:
   *   get:
   *     summary: Retrieve aggregated resource analytic field value by type for an analytic account.
   *     description: Retrieve aggregated resource analytic field.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         default: 1
   *         description: Numeric ID of the account to retrieve.
   *         schema:
   *           type: integer
   *       - in: path
   *         name: field
   *         required: true
   *         description: Analytic field name to retrieve.
   *         schema:
   *           type: string
   *           enum: [requestTime, responseTime, fetchTime, redirectTime]
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
   *                  required: true
   *                  type: string
   *                  description: The status of response
   *                  example: ok
   *                data:
   *                  required: true
   *                  type: array
   *                  description: Response data
   *                  example: [{"initiatorType":"css","count":239,"avg":523.0192887029289,"max":999.92,"min":14.07},{"initiatorType":"link","count":255,"avg":517.4356470588235,"max":998.24,"min":11.96},{"initiatorType":"other","count":252,"avg":463.15305555555557,"max":991.38,"min":4.44},{"initiatorType":"script","count":254,"avg":497.19149606299214,"max":992.88,"min":6.91}]
   *                  items:
   *                    required: true
   *                    type: object
   *                    properties:
   *                      initiatorType:
   *                        required: true
   *                        type: string
   *                        description: Type of the resource
   *                        example: css
   *                      count:
   *                        required: true
   *                        type: number
   *                        description: Count of resource type
   *                        example: 239
   *                      avg:
   *                        required: true
   *                        type: number
   *                        description: Average [field] timing by resource type
   *                        example: 11.96
   *                      max:
   *                        required: true
   *                        type: number
   *                        description: Max [field] timing by resource type
   *                        example: 11.96
   *                      min:
   *                        required: true
   *                        type: number
   *                        description: Min [field] timing by resource type
   *                        example: 11.96
   */
  routes.get(
    '/account/:id/resourceAnalyticsByType/:field',
    dashboardAnalyticsFetchSecurityMiddleware,
    async (req, res) => {
      if (!req.params.id) {
        return onBadRequest(res)
      }
      if (!req.params.field) {
        return onBadRequest(res, 'Paramater "field" is missing')
      }
      if (!ResourceAnalyticsEntry.rawAttributes[req.params.field]) {
        return onBadRequest(res, `Paramater "${req.params.field}" does not exist`)
      }
      try {
        const { id, field } = req.params
        const data = await resourceAnalyticsEntryRepository.findAll({
          group: ['initiatorType'],
          attributes: [
            'initiatorType',
            [cast(fn('count', col(field)), 'int'), 'count'],
            [fn('avg', col(field)), 'avg'],
            [fn('avg', col(field)), 'avg'],
            [fn('max', col(field)), 'max'],
            [fn('min', col(field)), 'min']
          ],
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
          data
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return onInternalError(res, err)
      }
    }
  )
}
