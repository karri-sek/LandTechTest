### LandTechTest
 ```
 Hi, hope you are doing well on this pandemic, thanks for the visiting this repo to look at the solution.
 
 I hope the journey of this understanding will be smooth and easy.
 ```
---
 ### how this solution made up ???
  ```
  I made up this solution as a simple RESTful end point. exposed an GET endpoint to get the count of the lands own by the company, either directly or from it's sub companies.
 
  That is enough said, Let's jump to run the project.
  ```
  ### how to start ?
  ```
  `yarn start` : will open the endpoint to access
   endpoint : `http://localhost:5000/landRegistry?companyID=C2013`
   
   response: `{
    "count": 5,
    "name": "Acme Land Ltd",
    "id": "C2013"
}`
```

### How to run tests?
```
yarn test or npm test: will run the tests, there is a test coverage.
```
### Assumptions 
```
1) make sure the Csv data has the parent data first before any child claims he/she is the child of XXX.
```
### other useful endpoint
```
Endpoint : `http://localhost:5000/help`

Response:  `{
    "message": "please provide valid customerID to get count of lands he owns example customer ID: C4012",
    "url": "http://localhost:5000/landRegistry?companyID=C4012"
}` 

Will provide some actual endpoint details on how to call.
```