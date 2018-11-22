/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of islands.';

export const definitions = {
  islandName: { type: String, unique: true, required: true },
  atollId: { type: Schema.Types.ObjectId, ref: 'Atoll' },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const islandSchema: Schema = new Schema(definitions);

export const Island = mongooseModel('Island', islandSchema);
