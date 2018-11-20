import * as Joi from 'joi';
// tslint:disable:variable-name
export const docTypeRuleSchema = Joi.object().keys({
  docType: Joi.string().required(),
});

export const docTypeAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(docTypeRuleSchema)
    .min(1)
    .required(),
});
