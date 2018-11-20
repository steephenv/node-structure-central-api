import * as Joi from 'joi';
// tslint:disable:variable-name
export const leaveRuleSchema = Joi.object().keys({
  leaveType: Joi.string().required(),
  userId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  comment: Joi.string().optional(),
});

export const leaveAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(leaveRuleSchema)
    .min(1)
    .required(),
});
