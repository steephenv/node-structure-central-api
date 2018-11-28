import * as Joi from 'joi';
import { RequestHandler } from 'express';
// tslint:disable:variable-name
export const hearingRuleSchema = Joi.object().keys({
  caseId: Joi.string().required(),
  attorney: Joi.string()
    .trim()
    .required(),
  result: Joi.string()
    .trim()
    .required(),
  purposeOfHearing: Joi.string()
    .trim()
    .required(),
  hearingDate: Joi.date().required(),
  id: Joi.string().optional(),
});

export const caseHearingRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    hearingRuleSchema,
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
