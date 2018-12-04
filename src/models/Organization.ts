/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores organization';

export const definitions = {
  organizationName: { type: String, required: true },
  organizationNameDiv: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
};

const organizationSchema: Schema = new Schema(definitions);

export const Organization = mongooseModel('Organization', organizationSchema);
