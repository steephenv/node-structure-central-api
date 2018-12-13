import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name

export const docShareSchema = Joi.object().keys({
  docId: Joi.string().required(),
  accessRights: Joi.array().required(),
});

export const docShareRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, docShareSchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
