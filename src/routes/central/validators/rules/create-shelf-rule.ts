import * as Joi from 'joi';
// tslint:disable:variable-name
export const shelfSchema = Joi.object().keys({
  shelfTitle: Joi.string().required(),
  location: Joi.string().required(),
  room: Joi.string().required(),
  capacity: Joi.number().required(),
});

export const shelfAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(shelfSchema)
    .min(1)
    .required(),
});
