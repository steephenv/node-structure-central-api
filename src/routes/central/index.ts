import * as express from 'express';
import { basicValidator } from './validators/basic-validator';
import { createOperation } from './create';
import { updateOperation } from './update';
import { removeOperation } from './remove';
import { fetchOperation } from './fetch';
// import { pdfOperation } from './gen-pdf';

export const centralApis = express.Router();

centralApis.post('/create', basicValidator, createOperation);
centralApis.post('/update', updateOperation);
centralApis.post('/remove', removeOperation);
centralApis.post('/fetch', fetchOperation);
// centralApis.post('/gen-pdf', pdfOperation);
