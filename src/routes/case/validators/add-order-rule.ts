import * as Joi from 'joi';
import { RequestHandler } from 'express';
// tslint:disable:variable-name
export const orderRuleSchema = Joi.object().keys({
  caseId: Joi.string().required(),
  orderDate: Joi.date().required(),
  order: Joi.string().required(),
  orderDiv: Joi.string().required(),
  id: Joi.string().optional(),
});

export const caseOrderRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    orderRuleSchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      next();
    },
  );
};
