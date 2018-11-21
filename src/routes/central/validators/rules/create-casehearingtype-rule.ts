import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseHearingTypeRuleSchema = Joi.object().keys({
  caseHearingType: Joi.string().required(),
});

export const caseHearingTypeRuleSchemaAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseHearingTypeRuleSchema)
    .min(1)
    .required(),
});
