/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores leave details';

export const definitions = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveType' },
  startDate: { type: Date },
  endDate: { type: Date },
  comment: { type: String },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const leaveSchema: Schema = new Schema(definitions);

export const Leave = mongooseModel('Leave', leaveSchema);
