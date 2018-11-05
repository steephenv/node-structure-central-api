import * as express from 'express';
import { get as getConfig } from 'config';
import { centralApis } from './central';

// swagger
import { swaggerSpec } from './swagger';

// create router
export const apis = express.Router();

apis.use('/central', centralApis);

// load docs if requested
if (getConfig('app.docs')) {
  // tslint:disable-next-line:no-var-requires
  // const swaggerSpec = require('./swagger');
  // deliver swagger spec
  console.log('> docs enabled'); // tslint:disable-line:no-console
  apis.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
