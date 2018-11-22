/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores case participants role and details';

export const definitions = {
  caseParticipantRole: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const caseParticipantRoleSchema: Schema = new Schema(definitions);

export const CaseParticipantRole = mongooseModel(
  'CaseParticipantRole',
  caseParticipantRoleSchema,
);
