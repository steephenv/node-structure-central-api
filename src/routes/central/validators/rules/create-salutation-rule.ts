import * as Joi from 'joi';
// tslint:disable:variable-name
export const salutationRuleSchema = Joi.object().keys({
  salutation: Joi.string().required(),
});

export const salutationAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(salutationRuleSchema)
    .min(1)
    .required(),
});
