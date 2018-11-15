import * as Joi from 'joi';
// tslint:disable:variable-name
const userRegSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .required(),
  role: Joi.string()
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .required(),
});

export const arraySchema = Joi.object().keys({
  content: Joi.array()
    .items(userRegSchema)
    .min(1)
    .required(),
});
