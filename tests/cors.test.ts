import { expect } from 'chai'
import supertest from 'supertest'

import app from '../src/app'
import { wrongOrigin, accountOrigin, mockAnalyticEntry, mockResourceAnalyticEntry } from './mocks'

describe('Cors checks for account fetch', () => {
  it('should fail with wrong origin', async () => {
    const { status } = await supertest(app).get('/account/abcdefghjklmn').set('Origin', wrongOrigin)
    expect(status).to.equal(500)
  })
  it('should pass with one of the account origins', async () => {
    const { body, status } = await supertest(app).get('/account/abcdefghjklmn').set('Origin', accountOrigin)
    const { data } = body
    expect(status).to.equal(200)
    expect(data).to.deep.equal({
      id: '1',
      accountName: 'Local test account'
    })
  })
})

describe('Cors checks for analytics post', () => {
  it('post analytics should fail with wrong origin', async () => {
    const { status } = await supertest(app)
      .post('/account/1/analytics')
      .set('Origin', wrongOrigin)
      .send(mockAnalyticEntry)
    expect(status).to.equal(500)
  })
  it('post analytics should pass with one of the account origins', async () => {
    const { status } = await supertest(app)
      .post('/account/1/analytics')
      .set('Origin', accountOrigin)
      .send(mockAnalyticEntry)
    expect(status).to.equal(200)
  })
})

describe('Cors checks for resource analytics post', () => {
  it('post resourceAnalytics should fail with wrong origin', async () => {
    const { status } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .set('Origin', wrongOrigin)
      .send([mockResourceAnalyticEntry])
    expect(status).to.equal(500)
  })
  it('post analytics should pass with one of the account origins', async () => {
    const { status } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .set('Origin', accountOrigin)
      .send([mockResourceAnalyticEntry])
    expect(status).to.equal(200)
  })
})
