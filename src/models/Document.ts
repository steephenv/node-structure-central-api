/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of uploaded documents info';

export const definitions = {
  case: { type: Schema.Types.ObjectId, ref: 'CaseDetails' },
  recordType: { type: Boolean },
  docTitle: { type: String, required: true },
  docUrl: { type: String },
  docAccess: { type: String, enum: ['public', 'private'], default: 'public' },

  docCategory: { type: String },
  entryNumber: { type: Number },
  documentNumber: { type: Number },
  docStage: { type: String },
  docSummary: { type: String },
  sender: { type: String },
  status: { type: String },
  docType: {
    type: Schema.Types.ObjectId,
    ref: 'DocType',
  },
  documentDate: { type: Date },
  sectionEntryDate: { type: Date },
  reminderDate: { type: Date },
  recipientDate: { type: Date },
  reminderMode: { type: String },
  pageCount: { type: Number },
  remindTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  secretary: { type: Schema.Types.ObjectId, ref: 'User' },
  sentBy: { type: Schema.Types.ObjectId, ref: 'User' },
  entryStaff: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  attorneyAssigned: { type: Schema.Types.ObjectId, ref: 'User' },
  sentByOrg: { type: Boolean },
  ward: { type: String },
  receiveSection: { type: Schema.Types.ObjectId, ref: 'DepartmentSection' },

  shelf: { type: Schema.Types.ObjectId, ref: 'Shelf' },
  accessRights: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastAccessBy: { type: Schema.Types.ObjectId, ref: 'User' },
  fileType: { type: String },
  note: { type: String },
  hasReminder: { type: Boolean, default: false },
  accessLog: [
    {
      takenDate: { type: Date },
      returnDate: { type: Date },
      accessedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  code: { type: String },
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
