/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores leave details';

export const definitions = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveType' },
  startDate: { type: Date },
  endDate: { type: Date },
  comment: { type: String },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const leaveSchema: Schema = new Schema(definitions);

leaveSchema.index({ userId: 1, startDate: 1, endDate: 1 }, { unique: true });

export const Leave = mongooseModel('Leave', leaveSchema);
