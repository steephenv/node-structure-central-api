import * as Joi from 'joi';
// tslint:disable:variable-name
export const roleSchema = Joi.object().keys({
  role: Joi.string().required(),
  displayNameDiv: Joi.string().required(),
  displayNameEng: Joi.string().required(),
});

export const roleAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(roleSchema)
    .min(1)
    .required(),
});
