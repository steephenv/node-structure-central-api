import * as express from 'express';

import { rule } from './validators/basic-validator';
import { mainOperations } from './operation-class';
// create router
export const apis = express.Router();

apis.use('/api', rule, mainOperations);
