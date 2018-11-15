import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseSchema = Joi.object().keys({
  caseNumber: Joi.string()
    .trim()
    .required(),
  caseTitle: Joi.string()
    .trim()
    .required(),
  entryNumber: Joi.string()
    .trim()
    .required(),
  courtCaseNumber: Joi.string()
    .trim()
    .required(),
  fileNos: Joi.string()
    .trim()
    .optional(),
  previousCaseNumber: Joi.string()
    .trim()
    .optional(),
  relatedCaseNumbers: Joi.array().optional(),
  typeOfCase: Joi.string()
    .trim()
    .required(),
  caseStatus: Joi.string()
    .trim()
    .required(),
  court: Joi.string()
    .trim()
    .required(),
  submittedDate: Joi.date().optional(),
  formSubmittedDate: Joi.date().optional(),
  reportReceivedDate: Joi.date().optional(),
  finishedDate: Joi.date().optional(),
});

export const caseAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseSchema)
    .min(1)
    .required(),
});
