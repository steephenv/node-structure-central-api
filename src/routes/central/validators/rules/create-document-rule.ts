import * as Joi from 'joi';
// tslint:disable:variable-name
export const documentSchema = Joi.object().keys({
  case: Joi.string().required(),
  docTitle: Joi.string().required(),
  docUrl: Joi.string().required(),
  physicalLoc: Joi.string().optional(),
  lastAccessBy: Joi.string().optional(),
  accessRights: Joi.array().optional(),
  accessLog: Joi.array().optional(),
});

export const documentAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(documentSchema)
    .min(1)
    .required(),
});
