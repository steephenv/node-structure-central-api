import * as Joi from 'joi';
// tslint:disable:variable-name
export const roleSchema = Joi.object().keys({
  role: Joi.string()
    .trim()
    .required(),
  displayNameDiv: Joi.string()
    .trim()
    .required(),
  displayNameEng: Joi.string()
    .trim()
    .required(),
});

export const roleAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(roleSchema)
    .min(1)
    .required(),
});
