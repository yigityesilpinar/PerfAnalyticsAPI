import { Response } from 'express'

export const onAccountNotFound = (res: Response) =>
  res.status(404).json({
    status: 'error',
    message: 'Account not found'
  })

export const onBadRequest = (res: Response) =>
  res.status(400).json({
    status: 'error',
    message: 'Bad request'
  })

export const onInternalError = (res: Response) =>
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
