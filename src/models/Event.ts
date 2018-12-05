/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of event info';

export const definitions = {
  title: { type: String, required: true },
  titleDiv: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
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

const eventSchema: Schema = new Schema(definitions);

export const Event = mongooseModel('Event', eventSchema);
