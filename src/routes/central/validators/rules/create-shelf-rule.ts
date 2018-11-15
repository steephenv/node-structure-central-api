import * as Joi from 'joi';
// tslint:disable:variable-name
export const shelfSchema = Joi.object().keys({
  shelfTitle: Joi.string()
    .trim()
    .required(),
  location: Joi.string()
    .trim()
    .required(),
  room: Joi.string()
    .trim()
    .required(),
  capacity: Joi.number().required(),
});

export const shelfAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(shelfSchema)
    .min(1)
    .required(),
});
