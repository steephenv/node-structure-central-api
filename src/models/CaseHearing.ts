/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of case hearings info';

export const definitions = {
  caseId: { type: Schema.Types.ObjectId, ref: 'CaseDetails' },
  attorney: { type: Schema.Types.ObjectId, ref: 'User' },
  caseHearingType: { type: Schema.Types.ObjectId, ref: 'CaseHearingType' },
  result: { type: String },
  resultDiv: { type: String },
  hearingDate: { type: Date },
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

const hearingSchema: Schema = new Schema(definitions);

export const CaseHearing = mongooseModel('CaseHearing', hearingSchema);
