import * as Joi from 'joi';
// tslint:disable:variable-name
export const contactTypeSchema = Joi.object().keys({
  contactTypeDiv: Joi.string()
    .trim()
    .required(),
  contactType: Joi.string()
    .trim()
    .required(),
});

export const contactTypeAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(contactTypeSchema)
    .min(1)
    .required(),
});
