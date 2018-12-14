import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name

import { documentSchema } from '../../central/validators/rules/create-document-rule';

export const docCreateRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, documentSchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
