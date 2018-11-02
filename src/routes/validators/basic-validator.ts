import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const userRegSchema = Joi.object().keys({
  collection: Joi.string().required(),
  operation: Joi.string().required(),
  email:Joi.string().required()
});

export const rule: RequestHandler = (req, res, next) => {
  let schema ;
  if(req.body.collection === 'User' && req.body.operation === 'save'){
    schema = userRegSchema
  }
  Joi.validate(req.body, schema, { stripUnknown: true }, err => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });

};
