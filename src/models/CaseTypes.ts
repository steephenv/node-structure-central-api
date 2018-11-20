/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores case type and details';

export const definitions = {
  caseType: { type: String, required: true, unique: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const caseTypeSchema: Schema = new Schema(definitions);

export const CaseType = mongooseModel('CaseType', caseTypeSchema);
