/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of role info';

export const definitions = {
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const roleSchema: Schema = new Schema(definitions);

export const Role = mongooseModel('Role', roleSchema);
