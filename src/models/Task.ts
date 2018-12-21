/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores task details';

export const definitions = {
  reminderDate: { type: Date },
  taskName: { type: String },
  taskNameDiv: { type: String },
  case: {
    type: Schema.Types.ObjectId,
    ref: 'CaseDetails',
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  status: {
    type: String,
  },
  message: { type: String },
  messageDiv: { type: String },
  dueDate: { type: Date },
  reminderMode: { type: String, enum: ['email', 'phone'] },
  remindTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
};

const taskSchema: Schema = new Schema(definitions);

export const Task = mongooseModel('Task', taskSchema);
