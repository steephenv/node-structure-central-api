import * as Joi from 'joi';
import { RequestHandler } from 'express';
// tslint:disable:variable-name
export const staffRuleSchema = Joi.object().keys({
  caseId: Joi.string().required(),
  status: Joi.string()
    .trim()
    .required(),
  party: Joi.string()
    .trim()
    .required(),
  attorney: Joi.string()
    .trim()
    .required(),
  assignedBy: Joi.date().required(),
  id: Joi.string().optional(),
});

export const caseStaffRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    staffRuleSchema,
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
