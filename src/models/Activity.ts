/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of activity info';

export const definitions = {
  description: { type: String },
  createdAt: { type: Date },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const activitySchema: Schema = new Schema(definitions);

export const Activity = mongooseModel('Activity', activitySchema);
