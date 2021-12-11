import { Response } from 'express'
import { ValidationError, Result } from 'express-validator'
import { Op, WhereOptions } from 'sequelize'

export const onAccountNotFound = (res: Response) =>
  res.status(404).json({
    status: 'error',
    message: 'Account not found'
  })

export const onBadRequest = (res: Response, errorsOrString?: Result<ValidationError> | string) =>
  res.status(400).json({
    status: 'error',
    ...(typeof errorsOrString === 'string'
      ? {
          errors: [errorsOrString]
        }
      : {
          ...(errorsOrString
            ? {
                errors: errorsOrString.array()
              }
            : {})
        })
  })

export const onInternalError = (res: Response, err: Error) =>
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' ? { err } : {})
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
