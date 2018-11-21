/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of atoll and islands.';

export const definitions = {
  officialName: { type: String, unique: true, required: true },
  commonName: { type: String, required: true },
  islands: [{ type: String }],
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const atollSchema: Schema = new Schema(definitions);

export const Atoll = mongooseModel('Atoll', atollSchema);
