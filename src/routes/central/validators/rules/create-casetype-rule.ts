import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseTypeRuleSchema = Joi.object().keys({
  caseType: Joi.string().required(),
});

export const caseTypeAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseTypeRuleSchema)
    .min(1)
    .required(),
});
