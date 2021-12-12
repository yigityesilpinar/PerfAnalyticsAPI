import { expect } from 'chai'
import supertest from 'supertest'
import autocannon from 'autocannon'

import app from '../src/app'
import config from '../src/app/config'

describe('API performance checks', () => {
  it('should handle 200 rps', async () => {
    await supertest(app)

    const result = await autocannon({
      url: `http://${config.get('host')}:${config.get('port')}/account/1/resourceAnalyticsByType/fetchTime`,
      amount: 200
    })
    expect(result.non2xx).equal(0)
  })
})
