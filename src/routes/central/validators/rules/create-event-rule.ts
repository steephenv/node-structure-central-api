import * as Joi from 'joi';
// tslint:disable:variable-name
export const eventRuleSchema = Joi.object().keys({
  title: Joi.string().required(),
  titleDiv: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

export const eventAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(eventRuleSchema)
    .min(1)
    .required(),
});
