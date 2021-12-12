import { expect } from 'chai'
import supertest from 'supertest'

import app from '../src/app'
import { mockAnalyticEntry, mockResourceAnalyticEntry } from './mocks'

describe('Validations for analytics post', () => {
  it('post analytics should fail with empty data', async () => {
    const { status } = await supertest(app).post('/account/1/analytics').send()
    expect(status).to.equal(400)
  })

  it('post analytics should fail with empty analyzeSessionUUID', async () => {
    const { status } = await supertest(app)
      .post('/account/1/analytics')
      .send({
        ...mockAnalyticEntry,
        analyzeSessionUUID: ''
      })
    expect(status).to.equal(400)
  })

  it('post analytics should fail with wrong format analyzeStartAt', async () => {
    const { status } = await supertest(app)
      .post('/account/1/analytics')
      .send({
        ...mockAnalyticEntry,
        analyzeStartAt: 'asdsasadadsasads'
      })
    expect(status).to.equal(400)
  })

  it('post analytics should fail with missing fields', async () => {
    const { fcp, ...mockAnalyticEntryWithMissingField } = mockAnalyticEntry
    const { status, body } = await supertest(app).post('/account/1/analytics').send(mockAnalyticEntryWithMissingField)

    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [
        // one for notNull and one for type number
        { msg: 'Invalid value', param: 'fcp', location: 'body' },
        { msg: 'Invalid value', param: 'fcp', location: 'body' }
      ]
    })
  })

  it('post analytics should fail with wrong type field', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/analytics')
      .send({ ...mockAnalyticEntry, fcp: 'wrongType' })

    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [{ msg: 'Invalid value', param: 'fcp', location: 'body', value: 'wrongType' }]
    })
  })

  it('post analytics should pass with correct values', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/analytics')
      .send({ ...mockAnalyticEntry, fcp: 0 })

    expect(status).to.equal(200)
  })
})

describe('Validations for resource analytics post', () => {
  it('post resource analytics should fail with empty data', async () => {
    const { status } = await supertest(app).post('/account/1/resourceAnalytics').send()
    expect(status).to.equal(400)
  })

  it('post resource analytics should fail with non array data', async () => {
    const { status } = await supertest(app).post('/account/1/resourceAnalytics').send(mockResourceAnalyticEntry)
    expect(status).to.equal(400)
  })

  it('post resource analytics should fail with empty analyzeSessionUUID', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .send([
        {
          ...mockResourceAnalyticEntry,
          analyzeSessionUUID: ''
        }
      ])
    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [
        {
          value: '',
          msg: 'Invalid value',
          param: '[0].analyzeSessionUUID',
          location: 'body'
        }
      ]
    })
  })

  it('post resource analytics should fail with wrong format analyzeStartAt', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .send([
        {
          ...mockResourceAnalyticEntry,
          analyzeStartAt: 'asdsasadadsasads'
        }
      ])
    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [
        {
          value: 'asdsasadadsasads',
          msg: 'Invalid value',
          param: '[0].analyzeStartAt',
          location: 'body'
        }
      ]
    })
  })

  it('post resource analytics should fail with missing fields', async () => {
    const { initiatorType, ...mockResourceAnalyticEntryWithMissingField } = mockResourceAnalyticEntry
    const { status, body } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .send([mockResourceAnalyticEntryWithMissingField])

    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [
        // one for notNull and one for type string
        { msg: 'Invalid value', param: '[0].initiatorType', location: 'body' },
        { msg: 'Invalid value', param: '[0].initiatorType', location: 'body' }
      ]
    })
  })

  it('post resource analytics should fail with wrong type field', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .send([{ ...mockResourceAnalyticEntry, fetchTime: 'wrongType' }])

    expect(status).to.equal(400)
    expect(body).to.deep.equal({
      status: 'error',
      errors: [{ msg: 'Invalid value', param: '[0].fetchTime', location: 'body', value: 'wrongType' }]
    })
  })

  it('post resource analytics should pass with correct values', async () => {
    const { status, body } = await supertest(app)
      .post('/account/1/resourceAnalytics')
      .send([{ ...mockResourceAnalyticEntry, fetchTime: 0 }])

    expect(status).to.equal(200)
  })
})
