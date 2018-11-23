/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores document section name and details';

export const definitions = {
  sectionName: { type: String, required: true },
  sectionNameDiv: { type: String, required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const departmentSectionSchema: Schema = new Schema(definitions);

export const DepartmentSection = mongooseModel(
  'DepartmentSection',
  departmentSectionSchema,
);
