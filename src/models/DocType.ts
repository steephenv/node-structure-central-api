/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores document type and details';

export const definitions = {
  docType: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const docTypeSchema: Schema = new Schema(definitions);

export const DocType = mongooseModel('DocType', docTypeSchema);
