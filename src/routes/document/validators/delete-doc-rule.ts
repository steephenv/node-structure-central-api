import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name

export const docDelSchema = Joi.object().keys({
  docId: Joi.string().required(),
});

export const docDelRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.query, docDelSchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
