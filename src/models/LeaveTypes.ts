/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores leave type and details';

export const definitions = {
  leaveTitle: { type: String, required: true },
  leaveTitleDiv: { type: String, required: true },
  numberOfDays: { type: Number },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const leaveTypeSchema: Schema = new Schema(definitions);

export const LeaveType = mongooseModel('LeaveType', leaveTypeSchema);
