import * as Joi from 'joi';
// tslint:disable:variable-name
export const orgSchema = Joi.object().keys({
  organizationNameDiv: Joi.string()
    .trim()
    .required(),
  organizationName: Joi.string()
    .trim()
    .required(),
});

export const orgAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(orgSchema)
    .min(1)
    .required(),
});
