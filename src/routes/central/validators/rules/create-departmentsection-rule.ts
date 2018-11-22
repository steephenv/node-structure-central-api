import * as Joi from 'joi';
// tslint:disable:variable-name
export const sectionRuleSchema = Joi.object().keys({
  departmentId: Joi.string().required(),
  sectionName: Joi.string().required(),
});

export const departSectionAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(sectionRuleSchema)
    .min(1)
    .required(),
});
