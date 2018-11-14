import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseSchema = Joi.object().keys({
  caseNumber: Joi.string().required(),
  caseTitle: Joi.string().required(),
  entryNumber: Joi.string().required(),
  courtCaseNumber: Joi.string().required(),
  fileNos: Joi.string().required(),
  previousCaseNumber: Joi.string().required(),
  relatedCaseNumbers: Joi.array().required(),
  typeOfCase: Joi.string().required(),
  caseStatus: Joi.string().required(),
  jurisdictionOrCourt: Joi.string().required(),
  submittedDate: Joi.date().required(),
  formSubmittedDate: Joi.string().required(),
  reportReceivedDate: Joi.string().required(),
  finishedDate: Joi.string().required(),
});

export const caseAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseSchema)
    .min(1)
    .required(),
});
