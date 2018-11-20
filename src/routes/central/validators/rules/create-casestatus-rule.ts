import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseStatusRuleSchema = Joi.object().keys({
  caseStatus: Joi.string().required(),
});

export const caseStatusAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseStatusRuleSchema)
    .min(1)
    .required(),
});
