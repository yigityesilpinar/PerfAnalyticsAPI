import { RequestHandler } from 'express'
import cors, { CorsOptions } from 'cors'

import config from '../config'
import { onBadRequest, onAccountNotFound, onInternalError } from '../routes/utils'
import { analyticsAccountRepository } from '../sequelize'

export type RequestMethod = 'GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'

interface MakeCorsOptions {
  allowedOrigins: string[] | '*'
  methods: RequestMethod[]
}
export const makeCorsOptions: (options: MakeCorsOptions) => CorsOptions = ({ allowedOrigins, methods }) => ({
  methods,
  preflightContinue: true,
  exposedHeaders: ['Content-Type', 'Accept', 'Referer', 'User-agent'],
  allowedHeaders: ['Content-Type', 'Accept', 'Referer', 'User-agent'],
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins === '*') {
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
})

export const accountPostSecurityMiddleware: RequestHandler = async (req, res, next) => {
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
      const allowedOrigins = JSON.parse(foundAccount.allowedOrigins)
      req.foundAccount = {
        id: foundAccount.id,
        accountName: foundAccount.accountName
      }
      return cors(
        makeCorsOptions({
          methods: ['POST'],
          allowedOrigins
        })
      )(req, res, next)
    } else {
      return onAccountNotFound(res)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return onInternalError(res, err)
  }
}

export const accountFetchSecurityMiddleware: RequestHandler = async (req, res, next) => {
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
      const allowedOrigins = JSON.parse(foundAccount.allowedOrigins)
      req.foundAccount = {
        id: foundAccount.id,
        accountName: foundAccount.accountName
      }
      return cors(
        makeCorsOptions({
          methods: ['GET'],
          allowedOrigins
        })
      )(req, res, next)
    } else {
      return onAccountNotFound(res)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return onInternalError(res, err)
  }
}

export const dashboardAnalyticsFetchSecurityMiddleware: RequestHandler = (req, res, next) => {
  try {
    return cors(
      makeCorsOptions({
        methods: ['GET'],
        allowedOrigins: [config.get('perfAnalyticsDashboardHost')]
      })
    )(req, res, next)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return onInternalError(res, err)
  }
}
