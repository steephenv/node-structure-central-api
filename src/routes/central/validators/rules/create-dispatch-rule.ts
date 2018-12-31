import * as Joi from 'joi';
// tslint:disable:variable-name
export const creteDispatchSchema = Joi.object().keys({
  dispatchNo: Joi.string(),
  caseNo: Joi.string(),
  qasiyaNo: Joi.string(),
  documentReferenceNo: Joi.string(),
  recipient: Joi.string(),
  requestedBy: Joi.string(),
  documentType: Joi.string(),
  documentSendDate: Joi.date(),
  sendBy: Joi.string(),
});

export const dispatchAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(creteDispatchSchema)
    .min(1)
    .required(),
});
