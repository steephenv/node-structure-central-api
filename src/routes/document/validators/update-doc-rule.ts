import * as Joi from 'joi';
// tslint:disable:variable-name

export const docUpdateSchema = Joi.object().keys({
  docId: Joi.string().required(),
  accessRights: Joi.array().optional(),
  case: Joi.string().optional(),
  recordType: Joi.string().optional(),
  docTitle: Joi.string().optional(),
  docUrl: Joi.string().optional(),

  docCategory: Joi.string().optional(),
  docStage: Joi.string().optional(),
  docSummary: Joi.string().optional(),

  documentDate: Joi.string().optional(),
  pageCount: Joi.string().optional(),
  secretary: Joi.string().optional(),
  sentBy: Joi.string().optional(),
  sentByOrg: Joi.string().optional(),
  ward: Joi.string().optional(),
  receiveSection: Joi.string().optional(),
  physicalLoc: Joi.string().optional(),

  lastAccessBy: Joi.string().optional(),
  fileType: Joi.string().optional(),
  accessLog: Joi.string().optional(),
  atoll: Joi.string().optional(),
  island: Joi.string().optional(),
  code: Joi.string().optional(),
});
