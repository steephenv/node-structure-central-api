/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores salutation type';

export const definitions = {
  salutation: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const salutationSchema: Schema = new Schema(definitions);

export const Salutation = mongooseModel('Salutation', salutationSchema);
