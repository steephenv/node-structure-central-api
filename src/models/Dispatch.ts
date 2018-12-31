/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores document type and details';

export const definitions = {
  dispatchNo: {
    type: String,
  },
  caseNo: {
    type: String,
  },
  qasiyaNo: {
    type: String,
  },
  documentReferenceNo: {
    type: String,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  documentType: {
    type: Schema.Types.ObjectId,
    ref: 'DocType',
  },
  documentSendDate: {
    type: Date,
  },
  sendBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
};

const dispatchSchema: Schema = new Schema(definitions);

export const Dispatch = mongooseModel('Dispatch', dispatchSchema);
