/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of uploaded documents info';

export const definitions = {
  case: { type: Schema.Types.ObjectId, ref: 'CaseDetails', required: true },
  docTitle: { type: String, required: true },
  docUrl: { type: String, required: true },
  physicalLoc: { type: Schema.Types.ObjectId, ref: 'Shelf' },
  accessRights: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastAccessBy: { type: Schema.Types.ObjectId, ref: 'User' },
  accessLog: [
    {
      takenDate: { type: Date },
      returnDate: { type: Date },
      accessedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
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

const documentsSchema: Schema = new Schema(definitions);

export const Document = mongooseModel('Document', documentsSchema);
