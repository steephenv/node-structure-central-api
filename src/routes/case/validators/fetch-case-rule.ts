import * as Joi from 'joi';
import { RequestHandler } from 'express';
// tslint:disable:variable-name
export const caseRuleSchema = Joi.object().keys({
  caseId: Joi.string().required(),
});

export const caseFetchRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.query,
    caseRuleSchema,
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
