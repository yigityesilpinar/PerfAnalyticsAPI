import { Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

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

interface MakeFilterByDateRangeOptions {
  fieldName: string
  start: string | undefined
  end: string | undefined
}
export const makeFilterByDateRange: (options: MakeFilterByDateRangeOptions) => WhereOptions = ({
  fieldName,
  start,
  end
}) => ({
  ...(start && end
    ? {
        [fieldName]: {
          [Op.between]: [start, end]
        }
      }
    : {
        ...(start
          ? {
              [fieldName]: {
                [Op.gte]: start
              }
            }
          : {
              ...(end
                ? {
                    [fieldName]: {
                      [Op.lte]: end
                    }
                  }
                : {})
            })
      })
})
