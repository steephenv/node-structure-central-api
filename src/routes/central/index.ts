import * as express from 'express';
import { basicValidator } from './validators/basic-validator';
import { createOperation } from './create';

export const centralApis = express.Router();

centralApis.post('/create', basicValidator, createOperation);
