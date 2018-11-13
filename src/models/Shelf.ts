/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of shelf';

export const definitions = {
  name: { type: String },
  location: { type: String },
  room: { type: String },
  capacity: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const shelfSchema: Schema = new Schema(definitions);

export const Shelf = mongooseModel('Shelf', shelfSchema);
