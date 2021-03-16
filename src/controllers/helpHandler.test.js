import getHelpMessage from './helpHandler'

describe('help Handler controller test ', () => {
    const mockRequest = (sessionData) => ({
        session: { data: sessionData }
      });
      
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };
      
    test('getHelpMessage() should have been called and returns the response json', async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        await getHelpMessage(req, res);
        expect(res.json).toHaveBeenCalledTimes(1);
    })
})


