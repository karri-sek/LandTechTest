import request from 'supertest'
import nock from 'nock'

describe('Land Registry GET Endpoint', () => {
    beforeEach(() => {
        nock("http://localhost:5000").get('/landRegistry')
        .query({companyID: 'C4012'})
        .reply(200, {
        count: 3,
      });
    });
    it('the get help endpoint should be able to call', async () => {
        const res = await request("http://localhost:5000").get('/landRegistry?companyID=C4012')
        expect(res.statusCode).toEqual(200)
    })
    it('the get landRegistry endpoint should return no of lands own by this and it sub companies', async () => {
        const companyID = 'C4012'
        const res = await request("http://localhost:5000").get(`/landRegistry?companyID=${companyID}`)
        expect(res.body.count).toEqual(3)
      })
    });