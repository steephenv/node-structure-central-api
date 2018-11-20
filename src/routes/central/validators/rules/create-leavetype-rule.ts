import * as Joi from 'joi';
// tslint:disable:variable-name
export const leaveTypeRuleSchema = Joi.object().keys({
  leaveTitle: Joi.string().required(),
  numberOfDays: Joi.number().optional(),
});

export const leaveTypeAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(leaveTypeRuleSchema)
    .min(1)
    .required(),
});
