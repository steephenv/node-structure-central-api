import * as Joi from 'joi';
// tslint:disable:variable-name
export const holidaySchema = Joi.object().keys({
  occasionDate: Joi.string()
    .trim()
    .required(),
  occasionNameEng: Joi.string()
    .trim()
    .required(),
  occasionNameDiv: Joi.string()
    .trim()
    .required(),
});

export const holidayAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(holidaySchema)
    .min(1)
    .required(),
});
