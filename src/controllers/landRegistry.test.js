import * as dataLoader from '../landRegistryDataLoader/dataLoader';
import * as landRegistry  from './landRegistry'
import * as utils from '../treeUtils/utils'
import Node from '../treeUtils/Node'

describe('land Registry controller test ', () => {
    const treeNode = new Node("C4012","J Sainsbury PLC",null);
    dataLoader.getLandOwnerTrees = jest.fn(()=>[treeNode]);
    utils.findCompany = jest.fn((a,b)=>treeNode);
    utils.getAllLandCount = jest.fn(()=>4);

     const mockRequest = () => ({ query: {}});
     const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

    test('getLandCount() should have been called and validate the request', async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        await landRegistry.getLandCount(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    })

    test('getLandOwnerTrees() should have been called ', async ()=>{
      const expectedResponse = {count: 4};
        const mockRequestWithCompanyID = () => ({
            query: {companyID: 'C402'}
          });
          const mockResponseWithCount = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue({count: 4});
            return res;
          };
        const req = mockRequestWithCompanyID();
        const res = mockResponseWithCount();
        const totalLandsCount = await landRegistry.getLandCount(req, res);
        expect(dataLoader.getLandOwnerTrees).toHaveBeenCalledTimes(1);
        expect(utils.findCompany).toHaveBeenCalledTimes(1);
        expect(utils.getAllLandCount).toHaveBeenCalledTimes(1);
        expect(totalLandsCount).toEqual(expectedResponse);
    })
})


