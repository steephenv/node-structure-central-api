import * as Joi from 'joi';
// tslint:disable:variable-name
export const departmentRuleSchema = Joi.object().keys({
  departmentName: Joi.string().required(),
});

export const departmentAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(departmentRuleSchema)
    .min(1)
    .required(),
});
