import * as Joi from 'joi';
// tslint:disable:variable-name
const userRegSchema = Joi.object().keys({
  email: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string().required(),
});

export const arraySchema = Joi.object().keys({
  content: Joi.array()
    .items(userRegSchema)
    .min(1)
    .required(),
});
