import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseSchema = Joi.object().keys({
  caseNumber: Joi.string().required(),
  caseTitle: Joi.string().required(),
  entryNumber: Joi.string().required(),
  courtCaseNumber: Joi.string().required(),
  fileNos: Joi.string().optional(),
  previousCaseNumber: Joi.string().optional(),
  relatedCaseNumbers: Joi.array().optional(),
  typeOfCase: Joi.string().required(),
  caseStatus: Joi.string().required(),
  court: Joi.string().required(),
  submittedDate: Joi.date().optional(),
  formSubmittedDate: Joi.string().optional(),
  reportReceivedDate: Joi.string().optional(),
  finishedDate: Joi.string().optional(),
});

export const caseAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseSchema)
    .min(1)
    .required(),
});
