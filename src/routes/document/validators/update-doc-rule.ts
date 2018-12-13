import * as Joi from 'joi';
// tslint:disable:variable-name

export const docTypeAddSchema = Joi.object().keys({
  operation: Joi.string()
    .lowercase()
    .required()
    .valid('copy', 'move', 'delete', 'edit', 'share'),
  docId: Joi.string().required(),
  destinationUrl: Joi.string()
    .when('operation', {
      is: 'copy',
      then: Joi.required(),
    })
    .when('operation', { is: 'move', then: Joi.required() }),
  docType: Joi.string()
    .when('operation', { is: 'copy', then: Joi.required() })
    .when('operation', { is: 'move', then: Joi.required() }),
  accessRights: Joi.array().when('operation', {
    is: 'share',
    then: Joi.required(),
  }),

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
