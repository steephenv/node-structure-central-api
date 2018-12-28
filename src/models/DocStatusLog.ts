/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores history of document status';

export const definitions = {
  documentId: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  msg: { type: String },
  status: { type: String, enum: ['open', 'close'] },
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

const docStatusSchema: Schema = new Schema(definitions);

export const DocumentStatusLog = mongooseModel(
  'DocumentStatusLog',
  docStatusSchema,
);
