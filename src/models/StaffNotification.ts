/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores staff notifications';

export const definitions = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRead: { type: Boolean, default: false },
  msg: { type: String },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
};

const staffNotificationSchema: Schema = new Schema(definitions);

export const StaffNotification = mongooseModel(
  'StaffNotification',
  staffNotificationSchema,
);
