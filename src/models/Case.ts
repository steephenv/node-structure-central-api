/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of case info';

export const definitions = {
  caseNumber: { type: String, unique: true, required: true },
  caseTitle: { type: String, required: true },
  entryNumber: { type: String, required: true },
  courtCaseNumber: { type: String, required: true },
  fileNos: { type: String },
  previousCaseNumber: { type: String },
  relatedCaseNumbers: [{ type: String }],
  typeOfCase: { type: String },
  caseStatus: { type: String },
  court: { type: String },
  submittedDate: { type: Date },
  formSubmittedDate: { type: Date },
  reportReceivedDate: { type: Date },
  finishedDate: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const caseSchema: Schema = new Schema(definitions);

export const CaseDetails = mongooseModel('CaseDetails', caseSchema);
