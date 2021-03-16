import request from 'supertest';
import nock from 'nock'
import Application from '../application/app';
describe('Help GET Endpoint', () => {
    
    beforeEach(() => {
        nock("http://localhost:5000").get('/help').reply(200, {
        message: 'provide valid customerID to get count of lands he owns example customer ID: C4012',
        url: 'http://localhost:5000/landRegistry?companyID=C4012'});
      });
      
    it('the get help endpoint should be able to call', async () => {
        const res = await request("http://localhost:5000").get('/help')
        expect(res.statusCode).toEqual(200)
    })
    it('the get help endpoint should be able to call', async () => {
         const expectedMsg = 'provide valid customerID to get count of lands he owns example customer ID: C4012';
        const res = await request("http://localhost:5000").get('/help')
        expect(res.body.message).toEqual(expectedMsg)
      })
  })