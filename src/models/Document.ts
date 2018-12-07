/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of uploaded documents info';

export const definitions = {
  case: { type: Schema.Types.ObjectId, ref: 'CaseDetails' },
  recordType: { type: Boolean },
  docTitle: { type: String, required: true },
  docUrl: { type: String, required: true },

  docCategory: { type: String },
  docStage: { type: String },
  docSummary: { type: String },
  docType: { type: String },
  documentDate: { type: Date },
  pageCount: { type: Number },
  secretary: { type: String },
  sentBy: { type: String },
  sentByOrg: { type: Boolean },
  ward: { type: String },
  receiveSection: { type: Schema.Types.ObjectId, ref: 'DepartmentSection' },

  physicalLoc: { type: Schema.Types.ObjectId, ref: 'Shelf' },
  accessRights: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastAccessBy: { type: Schema.Types.ObjectId, ref: 'User' },
  fileType: { type: String },
  accessLog: [
    {
      takenDate: { type: Date },
      returnDate: { type: Date },
      accessedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  atoll: {
    type: Schema.Types.ObjectId,
    ref: 'Atoll',
    comment:
      'has the from `objectId[]`. objectId taken from `Atoll` collection',
  },
  island: {
    type: Schema.Types.ObjectId,
    ref: 'Island',
    comment:
      'has the from `objectId[]`. objectId taken from `Island` collection',
  },
  code: { type: String, required: true },
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
