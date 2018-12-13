import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name

export const docCopySchema = Joi.object().keys({
  docId: Joi.string().required(),
  destinationUrl: Joi.string().required(),
  docType: Joi.string().required(),
});

export const docCopyRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, docCopySchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
