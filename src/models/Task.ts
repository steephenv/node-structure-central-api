/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores task details';

export const definitions = {
  reminderDate: { type: Date },
  dueDate: { type: Date },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
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
