import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

import { schemaRules } from './rules/index';

export const basicValidator: RequestHandler = (req, res, next) => {
  try {
    if (!req.body.collection || !req.body.operation) {
      return res.status(422).send({
        success: false,
        msg: 'Collection name or Operation name is missing',
      });
    }

    req.body.collection = req.body.collection.toLowerCase();
    req.body.operation = req.body.operation.toLowerCase();

    const { schema, opn } = findRule(req.body.collection, req.body.operation);

    Joi.validate(req.body, schema, opn, err => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      next();
    });
  } catch (err) {
    if (err.msg === 'no_validator') {
      next();
    }
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

function findRule(table: string, op: string) {
  const { opn = {}, schema } = schemaRules[`${table}-${op}`];

  if (!schema) {
    throw new Error('no_validator');
  }
  return { opn, schema };
}
