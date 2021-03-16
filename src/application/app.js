import express from 'express';
import  bodyParser from 'body-parser';

import { landRegistryRoute } from '../routes/landRegistryRoute';
import { helpRoute } from '../routes/helpRoute'

const Application = () => {
  const app  = express();
  app.use(bodyParser.json());
  app.use('/landRegistry', landRegistryRoute);
  app.use('/help', helpRoute);
  return app;
};

export default Application;