import * as Joi from 'joi';
// tslint:disable:variable-name
export const contactSchema = Joi.object().keys({
  organization: Joi.string()
    .trim()
    .required(),
  organizationDiv: Joi.string()
    .trim()
    .optional(),
  contact: Joi.string()
    .trim()
    .required(),
  contactDiv: Joi.string()
    .trim()
    .optional(),
  contactType: Joi.string()
    .trim()
    .optional(),
  contactTypeDiv: Joi.string()
    .trim()
    .optional(),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  fax: Joi.string()
    .trim()
    .optional(),
  houseApt: Joi.string()
    .trim()
    .required(),
  street: Joi.string()
    .trim()
    .required(),
  city: Joi.string()
    .trim()
    .required(),
  postCode: Joi.string()
    .trim()
    .required(),
  mobileNumber: Joi.string()
    .trim()
    .optional(),
  country: Joi.string()
    .trim()
    .required(),
  atoll: Joi.string()
    .trim()
    .required(),
  island: Joi.string()
    .trim()
    .required(),
});

export const contactAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(contactSchema)
    .min(1)
    .required(),
});
