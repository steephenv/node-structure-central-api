import * as Joi from 'joi';
// tslint:disable:variable-name
export const documentSchema = Joi.object().keys({
  case: Joi.string()
    .trim()
    .optional(),
  docTitle: Joi.string()
    .trim()
    .required(),
  status: Joi.string()
    .trim()
    .valid('open', 'close')
    .required(),
  docUrl: Joi.string()
    .trim()
    .optional(),
  physicalLoc: Joi.string()
    .trim()
    .optional(),
  lastAccessBy: Joi.string()
    .trim()
    .optional(),
  pageCount: Joi.number().optional(),
  accessRights: Joi.array().optional(),
  accessLog: Joi.array().optional(),
});

export const documentAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(documentSchema)
    .min(1)
    .required(),
});
