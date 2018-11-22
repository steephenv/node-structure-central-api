/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores case hearing type and details';

export const definitions = {
  caseHearingType: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const caseHearingTypeSchema: Schema = new Schema(definitions);

export const CaseHearingType = mongooseModel(
  'CaseHearingType',
  caseHearingTypeSchema,
);
